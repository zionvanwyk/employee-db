<template>
  <div class="home-page">
    <SideNavbar class="sidebar" />
    <div class="main-content">
      <h1>Employees</h1>
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SideNavbar from '@/components/SideNavbar.vue'
export default {
  components: {
    SideNavbar
  },
  data() {
    return {
      employees: [
        {
          _id: '1',
          name: 'Alice',
          surname: 'Smith',
          birthDate: '1988-05-12T00:00:00Z',
          employeeNumber: 'E0001',
          salary: 60000,
          role: 'Software Engineer',
          manager: 'E0005',
          avatarUrl: 'https://via.placeholder.com/50/FF0000/FFFFFF?text=AS'
        },
        {
          _id: '2',
          name: 'Bob',
          surname: 'Johnson',
          birthDate: '1976-10-23T00:00:00Z',
          employeeNumber: 'E0002',
          salary: 75000,
          role: 'Project Manager',
          manager: null,
          avatarUrl: 'https://via.placeholder.com/50/0000FF/FFFFFF?text=BJ'
        },
        {
          _id: '3',
          name: 'Charlie',
          surname: 'Brown',
          birthDate: '1990-11-17T00:00:00Z',
          employeeNumber: 'E0003',
          salary: 55000,
          role: 'QA Engineer',
          manager: 'E0001',
          avatarUrl: 'https://via.placeholder.com/50/00FF00/FFFFFF?text=CB'
        },
        {
          _id: '4',
          name: 'David',
          surname: 'Wilson',
          birthDate: '1985-08-04T00:00:00Z',
          employeeNumber: 'E0004',
          salary: 72000,
          role: 'DevOps Engineer',
          manager: 'E0001',
          avatarUrl: 'https://via.placeholder.com/50/FFFF00/FFFFFF?text=DW'
        },
        {
          _id: '5',
          name: 'Eva',
          surname: 'Davis',
          birthDate: '1992-07-19T00:00:00Z',
          employeeNumber: 'E0005',
          salary: 85000,
          role: 'Engineering Manager',
          manager: 'E0002',
          avatarUrl: 'https://via.placeholder.com/50/FF00FF/FFFFFF?text=ED'
        }
      ],
      selectedEmployees: [], // For checkboxes
      defaultAvatar: 'https://via.placeholder.com/50' // Placeholder image
    }
  },
  methods: {
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
    }
  }
}
</script>

<style>
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

.sidebar {
  flex: 0 0 240px; /* Sidebar width */
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.home-page {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* Ensures the content is scrollable if it overflows */
}
</style>
