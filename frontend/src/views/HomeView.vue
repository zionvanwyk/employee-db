<template>
  <div class="home-page">
    <div class="main-content">
      <h1>Employees</h1>
      <div class="actions-bar">
        <input
          v-model="searchQuery"
          @input="handleSearch(searchQuery)"
          type="text"
          placeholder="Search employees..."
          class="search-input"
        />

        <select
          v-model="selectedManager"
          @change="handleFilter({ role: selectedRole, manager: selectedManager })"
        >
          <option value="">All Managers</option>
          <option value="E001">Manager 1</option>
          <option value="E002">Manager 2</option>
          <!-- Add more managers as needed -->
        </select>

        <select v-model="sortKey" @change="handleSort({ key: sortKey, order: sortOrder })">
          <option value="">No Sort</option>
          <option value="name">Sort by Name</option>
          <option value="role">Sort by Role</option>
          <option value="salary">Sort by Salary</option>
        </select>

        <select v-model="sortOrder" @change="handleSort({ key: sortKey, order: sortOrder })">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button @click="showAddModal = true" class="add-employee-btn">Add Employee</button>
      </div>

      <!-- Employee Table -->
      <div class="table-container">
        <table class="w-full">
          <thead>
            <tr>
              <th><input type="checkbox" @change="toggleSelectAll" /></th>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Birth Date</th>
              <th>Employee Number</th>
              <th>Salary</th>
              <th>Role</th>
              <th>Manager</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in filteredEmployees" :key="employee._id">
              <td class="text-center">
                <input type="checkbox" v-model="selectedEmployees" :value="employee._id" />
              </td>
              <td class="text-center">
                <img
                  :src="employee.avatarUrl || defaultAvatar"
                  alt="Profile Picture"
                  class="profile-pic mx-auto"
                />
              </td>
              <td class="text-center">{{ employee.name }}</td>
              <td class="text-center">{{ employee.surname }}</td>
              <td class="text-center">{{ formatDate(employee.birthDate) }}</td>
              <td class="text-center">{{ employee.employeeNumber }}</td>
              <td class="text-center">{{ employee.salary }}</td>
              <td class="text-center">{{ employee.role }}</td>
              <td class="text-center">{{ employee.manager || 'N/A' }}</td>
              <td class="text-center">
                <button @click="editEmployee(employee)" class="text-blue-600">
                  <i class="pi pi-pencil"></i>
                </button>
                <button @click="deleteEmployee(employee._id)" class="text-red-600 ml-2">
                  <i class="pi pi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modals (Add and Edit) -->
      <!-- Add Employee Modal -->
      <div v-if="showAddModal" class="modal">
        <div class="modal-content">
          <AddEmployee @employeeAdded="addEmployeeToList" @close="showAddModal = false" />
        </div>
      </div>

      <!-- Edit Employee Modal -->
      <div v-if="showEditModal" class="modal">
        <div class="modal-content">
          <EditEmployee :employee="selectedEmployee" @update="updateEmployee" />
          <button @click="showEditModal = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditEmployee from '@/components/EditEmployee.vue'
import AddEmployee from '@/components/AddEmployee.vue'

export default {
  components: {
    EditEmployee,
    AddEmployee
  },
  data() {
    return {
      employees: [], // Employee data
      selectedEmployee: null, // Employee selected for editing
      showEditModal: false, // Controls visibility of the edit modal
      showAddModal: false, // Controls visibility of the add modal
      selectedEmployees: [], // Selected employees for bulk actions
      defaultAvatar: 'https://via.placeholder.com/50', // Placeholder image URL
      searchQuery: '', // Search query
      selectedRole: '', // Selected role for filtering
      selectedManager: '', // Selected manager for filtering
      sortKey: '', // Key to sort by
      sortOrder: 'asc' // Sorting order (asc or desc)
    }
  },
  mounted() {
    this.fetchEmployees() // Fetch employees when the component is mounted
  },
  computed: {
    filteredEmployees() {
      let filtered = this.employees

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (employee) =>
            employee.name.toLowerCase().includes(query) ||
            employee.surname.toLowerCase().includes(query) ||
            employee.employeeNumber.toLowerCase().includes(query)
        )
      }

      if (this.selectedRole) {
        filtered = filtered.filter((employee) => employee.role === this.selectedRole)
      }

      if (this.selectedManager) {
        filtered = filtered.filter((employee) => employee.manager === this.selectedManager)
      }

      if (this.sortKey) {
        filtered.sort((a, b) => {
          let result = 0
          if (a[this.sortKey] > b[this.sortKey]) {
            result = 1
          } else if (a[this.sortKey] < b[this.sortKey]) {
            result = -1
          }
          return this.sortOrder === 'asc' ? result : -result
        })
      }

      return filtered
    }
  },

  methods: {
    async fetchEmployees() {
      try {
        const response = await fetch('http://localhost:5000/api/employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          this.employees = data
        } else {
          console.error('Error fetching employees:', data.message)
        }
      } catch (error) {
        console.error('Fetch error:', error)
      }
    },

    handleSearch(query) {
      this.searchQuery = query
    },

    handleFilter({ role, manager }) {
      this.selectedRole = role
      this.selectedManager = manager
    },

    handleSort({ key, order }) {
      this.sortKey = key
      this.sortOrder = order
    },

    toggleSelectAll(event) {
      this.selectedEmployees = event.target.checked
        ? this.employees.map((employee) => employee._id)
        : []
    },

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },

    addEmployeeToList(newEmployee) {
      this.employees.push(newEmployee)
      this.showAddModal = false
    },

    editEmployee(employee) {
      this.selectedEmployee = { ...employee }
      this.showEditModal = true
    },

    updateEmployee(updatedEmployee) {
      const index = this.employees.findIndex((emp) => emp._id === updatedEmployee._id)
      if (index !== -1) {
        this.$set(this.employees, index, updatedEmployee)
      }
      this.showEditModal = false
    },

    async deleteEmployee(employeeId) {
      if (confirm('Are you sure you want to delete this employee?')) {
        try {
          const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          if (response.ok) {
            this.employees = this.employees.filter((employee) => employee._id !== employeeId)
            alert('Employee deleted successfully')
          } else {
            const data = await response.json()
            alert(`Error: ${data.message}`)
          }
        } catch (error) {
          console.error('Error deleting employee:', error)
        }
      }
    }
  }
}
</script>

<style scoped>
/* Modal styles */
/* Scoped Styles */
.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.table-container {
  max-height: calc(100vh - 200px); /* Adjust based on the size of your header, actions-bar, etc. */
  overflow-y: auto; /* Enable vertical scrolling */
  margin-top: 20px;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}
</style>
