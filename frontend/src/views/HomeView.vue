<template>
  <div class="home-page">
    <div class="main-content">
      <h1>Employees</h1>
      <div class="actions-bar">
        <SearchBar @search="handleSearch" />
        <SortDropdown @sort="handleSort" />
        <FilterDropdown :roles="roles" :managers="managers" @filter="handleFilter" />
        <button @click="showAddModal = true" class="add-employee-btn">Add Employee</button>
      </div>

      <!-- Employee Table -->
      <table>
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
          <tr v-for="employee in employees" :key="employee._id">
            <td><input type="checkbox" v-model="selectedEmployees" :value="employee._id" /></td>
            <td>
              <img
                :src="employee.avatarUrl || defaultAvatar"
                alt="Profile Picture"
                class="profile-pic"
              />
            </td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.surname }}</td>
            <td>{{ formatDate(employee.birthDate) }}</td>
            <td>{{ employee.employeeNumber }}</td>
            <td>{{ employee.salary }}</td>
            <td>{{ employee.role }}</td>
            <td>{{ employee.manager || 'N/A' }}</td>
            <td>
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
import SearchBar from '@/components/SearchBar.vue'
import SortDropdown from '@/components/SortDropdown.vue'
import FilterDropdown from '@/components/FilterDropdown.vue'

export default {
  components: {
    EditEmployee,
    AddEmployee,
    SearchBar,
    SortDropdown,
    FilterDropdown
  },
  data() {
    return {
      employees: [], // Employee data
      selectedEmployee: null, // Employee selected for editing
      showEditModal: false, // Controls visibility of the edit modal
      showAddModal: false, // Controls visibility of the add modal
      selectedEmployees: [], // Selected employees for bulk actions
      defaultAvatar: 'https://via.placeholder.com/50' // Placeholder image URL
    }
  },
  mounted() {
    this.fetchEmployees() // Fetch employees when the component is mounted
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
}

/* Table and other styles */
.home-page {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1; /* Take up remaining space */
  padding: 20px;
  overflow-y: auto; /* Ensures the content is scrollable if it overflows */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

button i {
  font-size: 1.2rem;
}
</style>
