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
      searchQuery: ''
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery)
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
