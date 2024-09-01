<template>
  <div class="organogram-page flex">
    <div class="organogram-content flex-1 p-8">
      <h1 class="text-3xl font-semibold mb-6">Company Organogram</h1>
      <OrganizationChart :value="data" collapsible class="company-chart">
        <template #person="slotProps">
          <div :class="`custom-node ${slotProps.node.styleClass}`">
            <div class="flex flex-col items-center">
              <img
                :alt="slotProps.node.data.name"
                :src="slotProps.node.data.image"
                class="mb-4 w-12 h-12 rounded-full"
              />
              <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
              <span>{{ slotProps.node.data.title }}</span>
            </div>
          </div>
        </template>
        <template #default="slotProps">
          <span :class="slotProps.node.styleClass">{{ slotProps.node.label }}</span>
        </template>
      </OrganizationChart>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OrganizationChart from 'primevue/organizationchart'

const data = ref({
  key: '0',
  type: 'person',
  styleClass: 'bg-indigo-100 rounded-xl p-4',
  data: {
    image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    name: 'Amy Elsner',
    title: 'CEO'
  },
  children: [
    {
      key: '0_0',
      type: 'person',
      styleClass: 'bg-purple-100 rounded-xl p-4',
      data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
        name: 'Anna Fali',
        title: 'CMO'
      },
      children: [
        {
          label: 'Sales',
          styleClass: 'bg-purple-200 rounded-xl p-4'
        },
        {
          label: 'Marketing',
          styleClass: 'bg-purple-200 rounded-xl p-4'
        }
      ]
    },
    {
      key: '0_1',
      type: 'person',
      styleClass: 'bg-teal-100 rounded-xl p-4',
      data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
        name: 'Stephen Shaw',
        title: 'CTO'
      },
      children: [
        {
          label: 'Development',
          styleClass: 'bg-teal-200 rounded-xl p-4'
        },
        {
          label: 'UI/UX Design',
          styleClass: 'bg-teal-200 rounded-xl p-4'
        }
      ]
    }
  ]
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

.company-chart {
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-node {
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  text-align: center;
}
</style>
