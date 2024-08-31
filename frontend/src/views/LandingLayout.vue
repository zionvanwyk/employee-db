<template>
  <div class="flex min-h-screen">
    <aside class="w-1/4 bg-gray-100 p-6 flex flex-col items-start">
      <img alt="EPIUSE logo" class="logo mb-6" src="@/assets/epiuse-logo.png" height="125" />
      <div class="wrapper text-black">
        <h1 class="font-lato text-xl mb-4">Welcome to EPI-USE Africa</h1>
        <nav class="font-openSans">
          <RouterLink to="/login" class="block mb-2 text-blue-500 hover:underline"
            >Login</RouterLink
          >
          <RouterLink to="/register" class="block text-blue-500 hover:underline"
            >Register</RouterLink
          >
        </nav>
      </div>
    </aside>

    <main class="flex-1 flex items-center justify-center p-6 bg-white">
      <RouterView />
    </main>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
</script>
