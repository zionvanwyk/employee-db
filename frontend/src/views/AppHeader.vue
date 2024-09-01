<template>
  <div class="app-container">
    <div class="content-container">
      <SideNavbar class="sidebar" />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavbar from '@/components/SideNavbar.vue'

export default {
  components: {
    SideNavbar
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden; /* Prevent scrolling */
}

.content-container {
  display: flex;
  flex: 1;
  overflow: hidden; /* Prevent scrolling in the content area */
}

.sidebar {
  width: 240px;
  background-color: #001744;
  border-right: 1px solid #ddd;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Prevent scrolling in the sidebar */
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow: hidden; /* Prevent scrolling in the main content */
}
</style>
