<template>
  <div id="app">
    <h1>Contacts</h1>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    
  }
}
</script>

<style>
.container {
  max-width: 1140px;
  margin: 0 auto;
}
</style>