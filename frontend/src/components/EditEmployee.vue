<template>
  <div class="edit-employee-form">
    <h2>Edit Employee</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Name:</label>
        <input v-model="employeeData.name" type="text" required />
      </div>
      <div>
        <label>Surname:</label>
        <input v-model="employeeData.surname" type="text" required />
      </div>
      <div>
        <label>Birth Date:</label>
        <input v-model="employeeData.birthDate" type="date" required />
      </div>
      <div>
        <label>Employee Number:</label>
        <input v-model="employeeData.employeeNumber" type="text" required />
      </div>
      <div>
        <label>Salary:</label>
        <input v-model="employeeData.salary" type="number" required />
      </div>
      <div>
        <label>Role:</label>
        <input v-model="employeeData.role" type="text" required />
      </div>
      <div>
        <label>Manager:</label>
        <input v-model="employeeData.manager" type="text" />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    employee: Object
  },
  data() {
    return {
      employeeData: { ...this.employee } // Clone the employee object to avoid mutating the original data
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/employees/number/${this.employeeData.employeeNumber}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.employeeData)
          }
        )
        const data = await response.json()
        if (response.ok) {
          this.$emit('update', data)
          alert('Employee updated successfully')
        } else {
          alert(`Error: ${data.message}`)
        }
      } catch (error) {
        console.error('Error updating employee:', error)
      }
    }
  }
}
</script>
