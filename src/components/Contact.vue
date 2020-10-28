<template>
  <li>
      <div>{{contact.name}}</div>
      <router-link :to="'/contact/' + contact.id">Contact info</router-link>
      <div v-if="!contact.deleting">
        <button
          @click="deletingContact"
          type="button"
        >Delete</button>
      </div>
      <div v-else>
        <button
          @click="cancelDeletion"
          type="button"
        >No</button>
        <button
          @click="deleteContact"
          type="button"
        >Yes</button>
      </div>
    </li>
</template>

<script>
export default {
  props: ['contact'],
  methods: {
    deletingContact() {
      this.$store.dispatch('deletingContact', this.contact.id)
    },
    cancelDeletion() {
      this.$store.dispatch('cancelDeletion', this.contact.id)
    },
    deleteContact() {
      this.$store.dispatch('deleteContact', this.contact.id)
    }
  }
}
</script>