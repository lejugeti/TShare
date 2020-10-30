<template>
  <div id="app">
    <header>
      <navbar></navbar>
    </header>
    <router-view />
  </div>
</template>

<script>
import navbar from './components/Navbar.vue';

export default {
  name: "App",
  components: {
    navbar,
  }
};
</script>

<style>
@import "./assets/app.css";
</style>
