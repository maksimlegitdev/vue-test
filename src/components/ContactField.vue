<template>
  <li>
    <div v-if="field.editing">
      <input value="field.title" v-model="title">
      <input value="field.value" v-model="value">
      <button
        @click="fieldEdit"
        type="button"
      >Edit</button>
    </div>
    <div v-else>
      <span>{{field.title}}</span>
      :
      <span>{{field.value}}</span>
    </div>
    <div v-if="!field.deleting">
      <button
        @click="deletingContactField"
        type="button"
      >Delete</button>
    </div>
    <div v-else>
      <button
        @click="cancelDeletingField"
        type="button"
      >No</button>
      <button
        @click="deleteField"
        type="button"
      >Yes</button>
    </div>
    <button
      v-if="field.editing && !field.cancelEditing"
      @click="cancelFieldEditing"
      type="button"
    >Cancel edit</button>
    <div v-else-if="field.cancelEditing">
      <button @click="noCancelEdit" type="button">No</button>
      <button @click="yesCancelEdit" type="button">Yes</button>
    </div>
    <button
      v-else
      @click="fieldEditing"
      type="button"
    >Edit</button>
  </li>
</template>

<script>
export default {
  props: ['field', 'contactId'],
  data() {
    return {
      title: this.field.title,
      value: this.field.value
    }
  },
  methods: {
    deletingContactField() {
      this.$store.dispatch('deletingContactField', {contactId: this.contactId, field: this.field})
    },
    cancelDeletingField() {
      this.$store.dispatch('cancelDeletingField', {contactId: this.contactId, field: this.field})
    },
    deleteField() {
      this.$store.dispatch('deleteField', {contactId: this.contactId, field: this.field})
    },
    fieldEditing() {
      this.$store.dispatch('fieldEditing', {contactId: this.contactId, field: this.field})
    },
    cancelFieldEditing() {
      this.$store.dispatch('cancelFieldEditing', {contactId: this.contactId, field: this.field})
    },
    fieldEdit() {
      this.$store.dispatch('fieldEdit', {contactId: this.contactId, field: this.field, edit: [this.title, this.value]})
    },
    noCancelEdit() {
      this.$store.dispatch('noCancelEdit', {contactId: this.contactId, field: this.field})
    },
    yesCancelEdit() {
      this.$store.dispatch('yesCancelEdit', {contactId: this.contactId, field: this.field})
    }
  }
}
</script>