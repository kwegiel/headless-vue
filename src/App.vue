<template>
  <div id="app">
    <app-navbar />    
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    appNavbar: Navbar
  }
};
</script>

<style>
</style>
