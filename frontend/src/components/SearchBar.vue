<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      @input="onSearch"
      type="text"
      placeholder="Search employees..."
      class="search-input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '' // This will hold the search query
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery) // Emit the search event with the search query
    }
  }
}
</script>

<style scoped>
.search-bar {
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
