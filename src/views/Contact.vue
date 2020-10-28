<template>
  <div>
    <h1>{{contact.name}}</h1>

    <form @submit.prevent="addContactField">
      <label>
        Title
        <input
          v-model="title"
          type="text"
        >
      </label>
      <label>
        Value
        <input
          v-model="value"
          type="text"
        >
      </label>
      <button type="submit">Add Contact Field</button>
    </form>

    <h2>Contact Fields</h2>
    <ul>
      <ContactField
        v-for="(field, index) of contact.contactFields"
        v-bind:field="field"
        v-bind:contactId="contact.id"
      />
      <button
        @click="cancelLastEdit"
        v-if="contact.lastEdit"
        type="button"
      >Cancel last edit</button>
    </ul>
  </div>
</template>

<script>
import ContactField from '@/components/ContactField'

export default {
  computed: {
    contact() {
      return this.$store.getters.contactById(+this.$route.params.id)
    }
  },
  components: {
    ContactField
  },
  data() {
    return {
      title: '',
      value: ''
    }
  },
  methods: {
    addContactField() {
      if (this.title.trim() && this.value.trim()) {
        const data = {
          id: this.contact.id,
          newField: {
            id: Date.now(),
            title: this.title,
            value: this.value,
            deleting: false,
            editing: false,
            cancelEditing: false
          }
        }

        this.$store.dispatch('addContactField', data)
        this.title = ''
        this.value = ''
      }
    },
    cancelLastEdit() {
      this.$store.dispatch('cancelLastEdit', this.contact.id)
    }
  }
}
</script>