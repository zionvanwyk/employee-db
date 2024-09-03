<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this employee?</p>
      <div class="modal-actions">
        <button @click="confirmDelete" class="confirm-btn">Delete</button>
        <button @click="this.$emit('close')" class="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employeeId: {
      type: String,
      required: true
    }
  },
  methods: {
    confirmDelete() {
      this.$emit('confirm', this.employeeId)
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
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-btn {
  background-color: #ce1443;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.cancel-btn {
  background-color: #ccc;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
