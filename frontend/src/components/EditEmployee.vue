<template>
  <div class="edit-employee-form">
    <h2 class="text-center text-2xl font-semibold mb-6">Edit Employee</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name:</label>
        <input v-model="employeeData.name" type="text" required class="input-box" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Surname:</label>
        <input v-model="employeeData.surname" type="text" required class="input-box" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Birth Date:</label>
        <input v-model="employeeData.birthDate" type="date" class="input-box" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Employee Number:</label>
        <input v-model="employeeData.employeeNumber" type="text" required class="input-box" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Salary:</label>
        <input v-model="employeeData.salary" type="number" required class="input-box" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Role:</label>
        <input v-model="employeeData.role" type="text" required class="input-box" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Manager:</label>
        <input v-model="employeeData.manager" type="text" class="input-box" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email:</label>
        <input v-model="employeeData.email" type="text" class="input-box" />
      </div>
      <div class="flex justify-end space-x-4">
        <button type="submit" class="btn-primary">Save Changes</button>
        <button type="button" @click="this.$emit('close')" class="btn-secondary">Cancel</button>
      </div>
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
      employeeData: { ...this.employee }
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
      this.$emit('close')
      location.reload()
    }
  }
}
</script>

<style scoped>
.edit-employee-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
}

.input-box {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  margin-top: 4px;
}

.btn-primary {
  background-color: #001744;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #357ab8;
}

.btn-secondary {
  background-color: #e2e2e2;
  color: #333;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #b5b5b5;
}
</style>
