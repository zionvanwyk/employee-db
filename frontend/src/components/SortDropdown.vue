<template>
  <div class="sort-dropdown">
    <select v-model="selectedSort" @change="onSortChange" class="sort-select">
      <option disabled value="">Sort by</option>
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="role-asc">Role (A-Z)</option>
      <option value="role-desc">Role (Z-A)</option>
      <option value="salary-asc">Salary (Low to High)</option>
      <option value="salary-desc">Salary (High to Low)</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSort: ''
    }
  },
  methods: {
    onSortChange() {
      this.$emit('sort', this.selectedSort)
    }
  }
}
</script>

<style scoped>
.sort-dropdown {
  margin-right: 15px;
}

.sort-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
