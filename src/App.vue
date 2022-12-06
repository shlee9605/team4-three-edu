<template>
  <div id="app">
    <edukit />
  </div>
</template>

<script>
import edukit from './views/index.vue'

export default {
  name: 'App',
  components: {
    edukit
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
