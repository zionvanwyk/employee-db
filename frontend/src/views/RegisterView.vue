<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-pink-600 mb-6 text-center">Register</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-pink-600 text-white font-semibold rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          Register
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account? <a href="#" class="text-pink-600 hover:text-pink-700">Log in</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      console.log('Email:', this.email)
      console.log('Password:', this.password)
    }
  }
}
</script>
