<template>
  <div class="add-employee-form">
    <h2>Add Employee</h2>
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
      <button type="submit">Add Employee</button>
      <button @click="$emit('close')">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeData: {
        name: '',
        surname: '',
        birthDate: '',
        employeeNumber: '',
        salary: '',
        role: '',
        manager: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:5000/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.employeeData)
        })
        const data = await response.json()
        if (response.ok) {
          this.$emit('employeeAdded', data)
          alert('Employee added successfully')
        } else {
          alert(`Error: ${data.message}`)
        }
      } catch (error) {
        console.error('Error adding employee:', error)
      }
    }
  }
}
</script>
