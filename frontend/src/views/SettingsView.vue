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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({}) // Define user as a ref to be reactive
const userProfile = ref({
  username: '',
  email: '',
  avatarUrl: ''
})

const defaultAvatar = 'https://via.placeholder.com/100'

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

const fetchUserProfile = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    user.value = data
    userProfile.value = {
      username: data.username,
      email: data.email,
      avatarUrl: data.avatarUrl || defaultAvatar
    }
    console.log('User Profile Data:', userProfile.value)
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

fetchUserProfile() // Fetch user profile when the component is setup
</script>

<script>
export default {
  mounted() {
    this.fetchUserProfile()
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        this.user = data
        console.log('User Profile Data:', this.user)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
  }
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
