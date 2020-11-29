<template>
  <div class="home">
    <greenline />
    <img alt="Vue logo" src="../assets/logo.png">
    <helloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/components/HelloWorld.vue'
import greenline from '@/components/GreenLine.vue'

export default {
  name: 'Home',
  components: {
    helloWorld,
    greenline
  }
}
</script>
