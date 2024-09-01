<template>
  <div class="home-page">
    <div class="main-content">
      <h1>Employees</h1>

      <!-- Top Bar with Search, Filter, Sort, and Add Button -->
      <div class="top-bar flex justify-between items-center mb-4">
        <!-- Search Bar -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search employees..."
          class="search-bar px-4 py-2 border rounded-md"
        />

        <!-- Filter Dropdown -->
        <select v-model="selectedFilter" class="filter-dropdown px-4 py-2 border rounded-md">
          <option value="">All Roles</option>
          <option value="Manager">Manager</option>
          <option value="Engineer">Engineer</option>
          <option value="Designer">Designer</option>
          <!-- Add more options as needed -->
        </select>

        <!-- Sort Dropdown -->
        <select v-model="selectedSort" class="sort-dropdown px-4 py-2 border rounded-md">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="salary">Salary</option>
          <option value="role">Role</option>
        </select>

        <!-- Add Employee Button -->
        <button
          @click="addEmployee"
          class="add-employee-btn px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Employee
        </button>
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
            <!-- New Actions Column -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in sortedAndFilteredEmployees" :key="employee._id">
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
                <!-- Edit Icon -->
              </button>
              <button @click="deleteEmployee(employee._id)" class="text-red-600 ml-2">
                <i class="pi pi-trash"></i>
                <!-- Delete Icon -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>

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

export default {
  components: {
    EditEmployee
  },
  data() {
    return {
      employees: [], // Will be filled with data from the API
      selectedEmployees: [], // For checkboxes
      defaultAvatar: 'https://via.placeholder.com/50', // Placeholder image
      searchQuery: '', // For search functionality
      selectedFilter: '', // For filtering by role
      selectedSort: '' // For sorting
    }
  },
  mounted() {
    this.fetchEmployees()
  },
  computed: {
    sortedAndFilteredEmployees() {
      // Filter employees based on search and role filter
      let filtered = this.employees.filter((employee) => {
        const matchesSearch =
          employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          employee.surname.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesFilter = this.selectedFilter ? employee.role === this.selectedFilter : true
        return matchesSearch && matchesFilter
      })

      // Sort employees based on selected criterion
      if (this.selectedSort) {
        filtered.sort((a, b) => {
          if (this.selectedSort === 'name') {
            return a.name.localeCompare(b.name)
          } else if (this.selectedSort === 'salary') {
            return a.salary - b.salary
          } else if (this.selectedSort === 'role') {
            return a.role.localeCompare(b.role)
          }
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
            Authorization: `Bearer ${localStorage.getItem('token')}` // Add authorization header if needed
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
      if (event.target.checked) {
        this.selectedEmployees = this.employees.map((employee) => employee._id)
      } else {
        this.selectedEmployees = []
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
    addEmployee() {
      // Logic to add a new employee
      console.log('Add Employee button clicked')
    },
    editEmployee(employee) {
      this.selectedEmployee = employee
      this.showEditModal = true
    },
    updateEmployee(updatedEmployee) {
      const index = this.employees.findIndex((emp) => emp._id === updatedEmployee._id)
      if (index !== -1) {
        this.$set(this.employees, index, updatedEmployee)
      }
      this.showEditModal = false
    },
    deleteEmployee(employeeId) {
      if (confirm('Are you sure you want to delete this employee?')) {
        fetch(`http://localhost:5000/api/employees/${employeeId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then((response) => {
            if (response.ok) {
              this.employees = this.employees.filter((employee) => employee._id !== employeeId)
              alert('Employee deleted successfully')
            } else {
              response.json().then((data) => {
                alert(`Error: ${data.message}`)
              })
            }
          })
          .catch((error) => {
            console.error('Error deleting employee:', error)
          })
      }
    }
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1; /* Take up remaining space */
  padding: 20px;
  overflow-y: auto; /* Ensures the content is scrollable if it overflows */
}

.top-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 20px;
}

.search-bar,
.filter-dropdown,
.sort-dropdown {
  flex: 1;
  max-width: 200px;
}

.add-employee-btn {
  background-color: #2563eb; /* Tailwind blue-600 */
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
