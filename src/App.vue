<script setup>
import api from './api/index.js';
import { RouterLink } from 'vue-router';
import Home from './components/HelloWorld.vue';


</script>

<template>
  <router-view>
    <Home></Home>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/profile">Profile</router-link>
    </div> -->
   </router-view> 
 
 
</template>

<script>
export default {
  name: 'App',
  components: {
    Home,
    
  },
  data() {
    return {
      msg: 'Vite + Vue'
    }
  },
  methods: {
    ping() {
      api.ping().then(res => {
        this.$router.push('/about')
      });
    }
  }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
