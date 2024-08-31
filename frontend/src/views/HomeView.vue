<template>
  <div>
    <h1>Employees</h1>
    <ul>
      <li v-for="employee in employees" :key="employee._id">
        {{ employee.name }} {{ employee.surname }} - {{ employee.role }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    data() {
      return {
        employees: []
      }
    },
    async created() {
      try {
        const response = await api.get('/employees')
        this.employees = response.data
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }
  }
}
</script>
