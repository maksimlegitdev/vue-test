<template>
  <form @submit.prevent="addContact">
    <label>
      Name
      <input type="text" v-model="name">
    </label>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    addContact() {
      if (this.name.trim()) {
        const newContact = {
          id: Date.now(),
          name: this.name,
          deleting: false,
          contactFields: [],
          lastEdit: null
        }

        this.$store.dispatch('addContact', newContact)
        this.name = ''
      }
    }
  }
}
</script>