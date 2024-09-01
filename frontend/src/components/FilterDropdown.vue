<template>
  <div class="filter-dropdown">
    <select v-model="selectedFilter" @change="onFilterChange" class="filter-select">
      <option disabled value="">Filter by</option>
      <optgroup label="Role">
        <option v-for="role in roles" :key="role" :value="`role-${role}`">{{ role }}</option>
      </optgroup>
      <optgroup label="Salary Bracket">
        <option value="salary-low">Below 50k</option>
        <option value="salary-mid">50k-100k</option>
        <option value="salary-high">Above 100k</option>
      </optgroup>
      <optgroup label="Manager">
        <option v-for="manager in managers" :key="manager" :value="`manager-${manager}`">
          {{ manager }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    roles: Array,
    managers: Array
  },
  data() {
    return {
      selectedFilter: ''
    }
  },
  methods: {
    onFilterChange() {
      this.$emit('filter', this.selectedFilter)
    }
  }
}
</script>

<style scoped>
.filter-dropdown {
  margin-right: 15px;
}

.filter-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
