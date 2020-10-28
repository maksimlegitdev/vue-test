<template>
  <div>
    <AddContact/>

    <ul>
      <Contact
        v-for="(contact, index) of contacts"
        :key="contact.id"
        v-bind:contact="contact"
      />
    </ul>
  </div>
</template>

<script>
import AddContact from '@/components/AddContact'
import Contact from '@/components/Contact'

export default {
  computed: {
    contacts() {
      return this.$store.getters.contacts
    }
  },
  components: {
    AddContact, Contact
  }
}
</script>