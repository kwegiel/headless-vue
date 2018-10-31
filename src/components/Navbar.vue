<template>
 <b-navbar toggleable="md" type="dark" variant="info">
  <b-container>
    <router-link class="navbar-brand" to="/">VuePortfolio</router-link>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse"> 
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">   
        <router-link class="nav-link" exact active-class="active" to="/">Home</router-link>
        <router-link v-for="item in pages" exact class="nav-link" active-class="active" :to=item.path :key=item.id>{{ item.title }}</router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-container>
  <div v-if="error">
    <b-modal v-model="modalShow" hide-footer title="Navigation"><h4>Loading navigation</h4> {{ error }}</b-modal>
  </div>
</b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      modalShow: true
    }
  },
  name: "Navbar",
  mounted () {
    this.$store.dispatch('loadPages')
  },
  computed: mapState(['pages', 'error'])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
nav {
  margin-bottom: 30px;
}
</style>
