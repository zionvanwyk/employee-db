<template>
  <div>
    <h1 class="text-3xl font-semibold mb-6">Company Organogram</h1>
    <div id="treeChart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const flatData = ref([]) // This will hold the flat data

async function fetchOrganogramData() {
  try {
    const response = await fetch('http://localhost:5000/api/employees', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const result = await response.json()
    flatData.value = result

    const hierarchicalData = buildHierarchy(flatData.value)
    createTreeChart(hierarchicalData)
  } catch (error) {
    console.error('Error fetching organogram data:', error)
  }
}

function buildHierarchy(data) {
  const map = {}
  const roots = []

  // Create a map for each item
  data.forEach((item) => {
    map[item.id] = { ...item, children: [] }
  })

  // Link parents with their children
  data.forEach((item) => {
    if (item.managerId) {
      if (!map[item.managerId].children) {
        map[item.managerId].children = []
      }
      map[item.managerId].children.push(map[item.id])
    } else {
      roots.push(map[item.id]) // No managerId means top-level
    }
  })

  return roots.length === 1 ? roots[0] : { name: 'Company', children: roots }
}

function createTreeChart(rootData) {
  const width = 960
  const height = 600

  const treeLayout = d3.tree().size([height, width - 160])

  const root = d3.hierarchy(rootData)
  treeLayout(root)

  const svg = d3
    .select('#treeChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(80,0)')

  svg
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr(
      'd',
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    )
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
    .attr('stroke-width', 2)

  const node = svg
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.y},${d.x})`)

  node.append('circle').attr('r', 5).attr('fill', '#999')

  node
    .append('text')
    .attr('dy', 3)
    .attr('x', (d) => (d.children ? -8 : 8))
    .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .text((d) => `${d.data.name} (${d.data.role})`)
}

onMounted(() => {
  fetchOrganogramData()
})
</script>

<style scoped>
#treeChart {
  width: 100%;
  height: 600px;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

.node circle {
  fill: #999;
}

.node text {
  font: 12px sans-serif;
}
</style>
