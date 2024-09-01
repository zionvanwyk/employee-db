<template>
  <div class="settings-page flex">
    <div class="settings-content flex-1 p-8">
      <h1 class="text-3xl font-semibold mb-8">Settings</h1>

      <!-- Profile Management Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-medium mb-4">Profile Management</h2>
        <div class="flex items-center mb-6">
          <img
            :src="userProfile.avatarUrl || defaultAvatar"
            alt="Profile Picture"
            class="profile-pic"
          />
          <div class="ml-6">
            <button @click="editProfilePicture" class="btn btn-primary mb-2">
              Change Profile Picture
            </button>
            <button @click="syncWithGravatar" class="btn btn-secondary">Sync with Gravatar</button>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" v-model="userProfile.username" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="userProfile.email" class="input-field" />
          </div>
          <button @click="updateProfile" class="btn btn-primary mt-4">Save Changes</button>
        </div>
      </section>

      <!-- Employee Management Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-medium mb-4">Employee Management</h2>
        <div class="grid grid-cols-1 gap-6">
          <button @click="addEmployee" class="btn btn-primary">Add Employee</button>
          <button @click="manageReportingStructure" class="btn btn-secondary">
            Manage Reporting Structure
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userProfile = ref({
  username: 'JohnDoe',
  email: 'johndoe@example.com',
  avatarUrl: '' // This will be populated with Gravatar URL or existing profile picture
})

const defaultAvatar = 'https://via.placeholder.com/100'

// Function to sync the profile picture with Gravatar
const syncWithGravatar = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/auth/sync-gravatar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ email: userProfile.value.email })
    })

    const data = await response.json()

    if (response.ok) {
      userProfile.value.avatarUrl = data.avatarUrl // Update the profile picture in the frontend
      alert('Profile picture synced with Gravatar successfully')
    } else {
      alert(`Error: ${data.message}`)
    }
  } catch (error) {
    console.error('Error syncing with Gravatar:', error)
    alert('Failed to sync with Gravatar. Please try again later.')
  }
}

const editProfilePicture = () => {
  // Logic to allow the user to upload or change their profile picture
  console.log('Edit profile picture')
}

const updateProfile = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(userProfile.value)
    })

    const data = await response.json()

    if (response.ok) {
      alert('Profile updated successfully')
    } else {
      alert(`Error: ${data.message}`)
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile. Please try again later.')
  }
}

const addEmployee = () => {
  // Logic to add a new employee
  console.log('Add Employee')
}

const manageReportingStructure = () => {
  // Logic to manage the reporting structure
  console.log('Manage Reporting Structure')
}
</script>

<style scoped>
.settings-page {
  display: flex;
  height: 100vh;
}

.settings-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #e2e2e2;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #3a7ad2;
}

.btn-secondary:hover {
  background-color: #d2d2d2;
}
</style>
