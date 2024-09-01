<template>
  <div class="organogram-page flex">
    <div class="organogram-content flex-1 p-8">
      <h1 class="text-3xl font-semibold mb-6">Company Organogram</h1>
      <OrganizationChart
        v-model:selectionKeys="selection"
        :value="nodes"
        collapsible
        selectionMode="multiple"
      >
        <template #person="slotProps">
          <div class="flex flex-col items-center">
            <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
            <span>{{ slotProps.node.data.title }}</span>
          </div>
        </template>
        <template #default="slotProps">
          <span>{{ slotProps.node.label }}</span>
        </template>
      </OrganizationChart>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OrganizationChart from 'primevue/organizationchart'

const nodes = ref([]) // This will hold the tree structure
const selection = ref({})

// Function to fetch employees and build the tree structure
async function fetchAndBuildTree() {
  try {
    const response = await fetch('http://localhost:5000/api/employees', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const employees = await response.json()

    console.log('Fetched Employees:', employees) // Check if employees are fetched correctly

    const employeeMap = {}
    employees.forEach((employee) => {
      employeeMap[employee.employeeNumber] = {
        key: employee.employeeNumber,
        type: 'person',
        data: {
          image: employee.avatarUrl || 'https://via.placeholder.com/50',
          name: `${employee.name} ${employee.surname}`,
          title: employee.role
        },
        children: []
      }
    })

    console.log('Employee Map:', employeeMap) // Check if employeeMap is built correctly

    const tree = []
    employees.forEach((employee) => {
      if (employee.manager && employeeMap[employee.manager]) {
        employeeMap[employee.manager].children.push(employeeMap[employee.employeeNumber])
      } else {
        tree.push(employeeMap[employee.employeeNumber]) // Top-level nodes (no manager)
      }
    })

    console.log('Final Tree Structure:', tree) // Check final tree structure

    nodes.value = tree
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
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

.custom-node {
  display: flex;
  align-items: center;
  font-weight: bold;
}
</style>
