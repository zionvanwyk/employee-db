<template>
  <div class="organogram-page flex">
    <!-- Main content area for the tree view -->
    <div class="organogram-content flex-1 p-8">
      <h1 class="text-3xl font-semibold mb-6">Company Organogram</h1>
      <TreeComponent :value="nodes" class="company-tree" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TreeComponent from 'primevue/tree' // Assuming PrimeVue is used

// Sample hierarchical data representing the company's structure
const nodes = ref([
  {
    label: 'CEO',
    children: [
      {
        label: 'CTO',
        children: [{ label: 'Engineering Manager' }, { label: 'QA Manager' }]
      },
      {
        label: 'CFO',
        children: [{ label: 'Accounts Manager' }, { label: 'Financial Analyst' }]
      },
      {
        label: 'COO',
        children: [{ label: 'Operations Manager' }, { label: 'Logistics Manager' }]
      }
    ]
  }
])
</script>

<style scoped>
.organogram-page {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: var(--color-background-soft);
  border-right: 1px solid var(--color-border);
}

.organogram-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.company-tree {
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
