<template>
  <div class="card flex flex-col items-center justify-between h-full bg-white shadow-lg p-4">
    <MenuComponent :model="items" class="w-full">
      <!-- Start Slot: Logo -->
      <template #start>
        <div class="flex items-center justify-center mb-12">
          <img
            src="@/assets/epiuse-logo.png"
            alt="EPI-USE Africa"
            class="h-12 w-auto"
            style="max-height: 50px; max-width: 150px"
          />
        </div>
      </template>

      <!-- Menu Items Slot -->
      <template #item="{ item, props }">
        <a
          v-ripple
          class="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="text-lg font-medium text-gray-800"> {{ item.label }}</span>
          <BadgeComponent v-if="item.badge" class="ml-auto" :value="item.badge" />
        </a>
      </template>

      <template #end>
        <button
          v-ripple
          class="relative overflow-hidden w-12 border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 mt-8"
        >
          <AvatarComponent
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-2 w-12 h-12"
            shape="circle"
          />
          <span class="inline-flex flex-col items-start">
            <span class="font-bold text-gray-900">Zion van Wyk </span>
            <span class="text-sm text-gray-600">HR Manager</span>
          </span>
        </button>
      </template>
    </MenuComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    label: 'All Employees',
    icon: 'pi pi-folder'
  },
  {
    label: 'Organogram',
    icon: 'pi pi-folder'
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog'
  }
])
</script>

<style>
.card {
  width: 240px;
  height: 100vh;
}

.MenuComponent a {
  margin-bottom: 12px;
}

.MenuComponent a:last-child {
  margin-bottom: 0;
}
</style>
