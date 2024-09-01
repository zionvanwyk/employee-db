<template>
  <div class="card flex flex-col items-center justify-between h-full shadow-lg p-4">
    <MenuComponent :model="items" class="w-full menu-custom">
      <!-- Start Slot: Logo -->
      <template #start>
        <div class="flex items-center justify-center mb-12 logo-container">
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
        <router-link
          v-ripple
          :to="item.to"
          class="flex items-center justify-between p-3 hover:bg-blue-highlight transition-colors duration-200"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="text-lg font-medium"> {{ item.label }}</span>
          <BadgeComponent v-if="item.badge" class="ml-auto" :value="item.badge" />
        </router-link>
      </template>

      <template #end>
        <button
          v-ripple
          class="relative overflow-hidden w-full border-0 bg-transparent flex items-center p-2 hover:bg-blue-highlight rounded-lg cursor-pointer transition-colors duration-200 mt-8"
        >
          <AvatarComponent
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-4 w-8 h-8"
            shape="circle"
          />
          <span class="flex flex-col items-start text-left">
            <span class="text-xl font-bold">Zion van Wyk</span>
            <span class="text-sm">HR Manager</span>
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
    icon: 'pi pi-folder',
    to: '/home'
  },
  {
    label: 'Organogram',
    icon: 'pi pi-folder',
    to: '/organogram'
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    to: '/settings'
  }
])
</script>

<style>
.card {
  width: 240px;
  height: 100vh;
  background-color: #001744 !important; /* Force the background to be your custom blue */
  color: white;
}

.logo-container {
  background-color: white;
  padding: 20px;
}

.MenuComponent a,
.MenuComponent a span {
  color: white;
}

.MenuComponent a:hover {
  background-color: #001e59 !important; /* Force the hover color */
}

.MenuComponent a:hover span {
  color: white;
}
</style>
