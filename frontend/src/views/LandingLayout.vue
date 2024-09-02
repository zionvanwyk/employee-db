<template>
  <div class="flex min-h-screen">
    <aside class="w-1/2 bg-gray-100 p-6 flex flex-col items-center justify-center">
      <img alt="EPIUSE logo" class="logo mb-12 h-52" src="@/assets/epiuse-logo.png" />
      <div class="wrapper text-black text-center">
        <h1 class="font-lato text-3xl mb-8">Welcome to EPI-USE Africa's Employee Database</h1>
        <p class="text-lg mb-6">
          This application is designed to manage employee data for EPI-USE Africa. <br />
          <br />
          Please log in to access your account and manage your details.
        </p>
      </div>
    </aside>

    <main class="flex-1 flex flex-col items-center justify-start p-6 bg-white">
      <div class="w-full">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Set the default route to the login page
router.push('/login')
</script>
