<template>
  <div class="modal">
    <div class="modal-content">
      <div class="employee-info">
        <div class="info-box">
          <p><strong>Name:</strong> {{ employee.name }}</p>
        </div>
        <div class="info-box">
          <p><strong>Surname:</strong> {{ employee.surname }}</p>
        </div>
        <div class="info-box">
          <p><strong>Birth Date:</strong> {{ formatDate(employee.birthDate) }}</p>
        </div>
        <div class="info-box">
          <p><strong>Employee Number:</strong> {{ employee.employeeNumber }}</p>
        </div>
        <div class="info-box">
          <p><strong>Email:</strong> {{ employee.email }}</p>
        </div>
        <div class="info-box">
          <p><strong>Role:</strong> {{ employee.role }}</p>
        </div>
        <div class="info-box">
          <p><strong>Manager:</strong> {{ employee.manager || 'N/A' }}</p>
        </div>
        <div class="info-box">
          <p><strong>Salary:</strong> {{ formatCurrency(employee.salary) }}</p>
        </div>
      </div>
      <div class="modal-actions">
        <button @click="$emit('close')" class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ZAR'
      }).format(amount)
    }
  }
}
</script>

<style scoped>
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
  width: 400px;
  max-width: 100%;
  border-radius: 8px; /* Rounded corners for a nicer look */
}

.employee-info {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr; /* Single column grid */
  gap: 10px; /* Spacing between boxes */
}

.info-box {
  background-color: #f9f9f9; /* Light gray background for each info box */
  padding: 10px;
  border-radius: 4px; /* Rounded corners for the boxes */
  border: 1px solid #ddd; /* Border to define the boxes */
}

.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.close-btn {
  background-color: #ccc;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
