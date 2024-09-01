<template>
  <div class="organogram-page flex">
    <div class="organogram-content flex-1 p-8">
      <h1 class="text-3xl font-semibold mb-6">Company Organogram</h1>
      <div ref="chart" class="organization-chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const chartRef = ref(null) // Reference to the chart container

// Function to fetch employees and build the tree structure
async function fetchAndBuildTree() {
  try {
    const response = await fetch('http://localhost:5000/api/employees', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const employees = await response.json()

    // Map employees by employeeNumber for easy lookup
    const employeeMap = {}
    employees.forEach((employee) => {
      employeeMap[employee.employeeNumber] = {
        name: `${employee.name} ${employee.surname}`,
        title: employee.role,
        children: []
      }
    })

    // Build the hierarchy
    const root = { name: 'Company', children: [] }
    employees.forEach((employee) => {
      if (employee.manager && employeeMap[employee.manager]) {
        employeeMap[employee.manager].children.push(employeeMap[employee.employeeNumber])
      } else {
        root.children.push(employeeMap[employee.employeeNumber]) // Top-level nodes (no manager)
      }
    })

    // Build the D3 tree layout
    buildTree(root)
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
}

// Function to build the tree layout using D3.js
function buildTree(data) {
  const width = 960
  const height = 600

  const svg = d3
    .select(chartRef.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(40,0)')

  const treeLayout = d3.tree().size([height, width - 160])
  const root = d3.hierarchy(data)

  treeLayout(root)

  // Links
  svg
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
    .attr('stroke-width', 2)
    .attr(
      'd',
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    )

  // Nodes
  const node = svg
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.y},${d.x})`)

  node.append('circle').attr('r', 10).attr('fill', '#69b3a2')

  node
    .append('text')
    .attr('dy', 3)
    .attr('x', (d) => (d.children ? -12 : 12))
    .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .text((d) => `${d.data.name} - ${d.data.title}`)
}

onMounted(() => {
  fetchAndBuildTree()
})
</script>

<style scoped>
.organogram-page {
  display: flex;
  height: 100vh;
}

.organogram-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.organization-chart {
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link {
  fill: none;
  stroke: #555;
  stroke-width: 2px;
}

.node circle {
  fill: #999;
  stroke: steelblue;
  stroke-width: 3px;
}

.node text {
  font: 12px sans-serif;
}
</style>
