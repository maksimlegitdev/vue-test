import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: JSON.parse(localStorage.getItem('contacts') || '[]')
  },
  mutations: {
    addContact(state, newContact) {
      state.contacts.push(newContact)

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    deletingContact(state, id) {
      state.contacts.find(contact => contact.id === id).deleting = true

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    cancelDeletion(state, id) {
      state.contacts.find(contact => contact.id === id).deleting = false

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    deleteContact(state, id) {
      state.contacts.splice(state.contacts.findIndex(contact => contact.id === id), 1)

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    addContactField(state, data) {
      const contact = state.contacts.find(contact => contact.id === data.id)
      contact.contactFields.push(data.newField)
      contact.lastEdit = {
        type: 'addField',
        data: {
          id: data.newField.id
        }
      }

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    deletingContactField(state, data) {
      state.contacts.find(contact => contact.id === data.contactId).contactFields.find(field => field.id === data.field.id).deleting = true

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    cancelDeletingField(state, data) {
      state.contacts.find(contact => contact.id === data.contactId).contactFields.find(field => field.id === data.field.id).deleting = false

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    deleteField(state, data) {
      const contactFields = state.contacts.find(contact => contact.id === data.contactId).contactFields

      contactFields.splice(contactFields.findIndex(field => field.id === data.field.id), 1)

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    fieldEditing(state, data) {
      state.contacts.find(contact => contact.id === data.contactId).contactFields.find(field => field.id === data.field.id).editing = true

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    cancelFieldEditing(state, data) {
      state.contacts.find(contact => contact.id === data.contactId).contactFields.find(field => field.id === data.field.id).cancelEditing = true

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    fieldEdit(state, data) {
      const contact = state.contacts.find(contact => contact.id === data.contactId)
      const field = contact.contactFields.find(field => field.id === data.field.id)

      contact.lastEdit = {
        type: 'fieldEdit',
        data: {
          id: field.id,
          title: field.title,
          value: field.value
        }
      }

      field.title = data.edit[0]
      field.value = data.edit[1]
      field.editing = false

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    noCancelEdit(state, data) {
      state.contacts.find(contact => contact.id === data.contactId).contactFields.find(field => field.id === data.field.id).cancelEditing = false

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    yesCancelEdit(state, data) {
      const field = state.contacts.find(contact => contact.id === data.contactId).contactFields.find(field => field.id === data.field.id)

      field.editing = false
      field.cancelEditing = false

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    cancelLastEdit(state, id) {
      const contacts = state.contacts
      const contact = contacts.find(contact => contact.id === id)
      const lastEdit = contact.lastEdit

      if (lastEdit.type === 'addField') {
        contact.contactFields.splice(contact.contactFields.findIndex(field => field.id === lastEdit.data.id), 1)
      }

      if (lastEdit.type === 'fieldEdit') {
        const fieldIndex = contact.contactFields.findIndex(field => field.id === lastEdit.data.id)
        contact.contactFields[fieldIndex].title = lastEdit.data.title
        contact.contactFields[fieldIndex].value = lastEdit.data.value
      }

      contact.lastEdit = null

      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    }
  },
  actions: {
    addContact({commit}, newContact) {
      commit('addContact', newContact)
    },
    deletingContact({commit}, id) {
      commit('deletingContact', id)
    },
    cancelDeletion({commit}, id) {
      commit('cancelDeletion', id)
    },
    deleteContact({commit}, id) {
      commit('deleteContact', id)
    },
    addContactField({commit}, data) {
      commit('addContactField', data)
    },
    deletingContactField({commit}, data) {
      commit('deletingContactField', data)
    },
    cancelDeletingField({commit}, data) {
      commit('cancelDeletingField', data)
    },
    deleteField({commit}, data) {
      commit('deleteField', data)
    },
    fieldEditing({commit}, data) {
      commit('fieldEditing', data)
    },
    cancelFieldEditing({commit}, data) {
      commit('cancelFieldEditing', data)
    },
    fieldEdit({commit}, data) {
      commit('fieldEdit', data)
    },
    noCancelEdit({commit}, data) {
      commit('noCancelEdit', data)
    },
    yesCancelEdit({commit}, data) {
      commit('yesCancelEdit', data)
    },
    cancelLastEdit({commit}, id) {
      commit('cancelLastEdit', id)
    }
  },
  getters: {
    contacts: state => state.contacts,
    contactById: state => id => state.contacts.find(contact => contact.id === id)
  }
})