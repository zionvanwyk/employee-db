<template>
  <div class="settings-page flex">
    <div class="settings-content flex-1 p-8">
      <h1 class="text-3xl font-semibold mb-6">Settings</h1>

      <section class="mb-12">
        <h2 class="text-2xl font-medium mb-4">Employee Management</h2>
        <div class="grid grid-cols-1 gap-6">
          <button class="btn btn-primary">Add Employee</button>
          <button class="btn btn-secondary">Manage Reporting Structure</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.settings-page {
  display: flex;
  height: 100vh;
}

.settings-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-secondary {
  background-color: #e2e2e2;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
