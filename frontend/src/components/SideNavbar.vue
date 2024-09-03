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
          <BadgeComponent v-if="item.badge" :value="item.badge" />
        </router-link>
      </template>

      <template #end>
        <br />
        <br />
        <br />
        <br />
        <br />
        <button @click="logout" class="logout-button">Log Out</button>
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
    to: '/app/home'
  },
  {
    label: 'Employee Hiearchy',
    icon: 'pi pi-sitemap',
    to: '/app/organogram'
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    to: '/app/settings'
  }
])

const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
</script>

<script>
export default {
  data() {
    return {
      userProfile: {}
    }
  },
  mounted() {
    this.fetchUserProfile()
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        this.userProfile = data
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
  }
}
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

.logout-button {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
