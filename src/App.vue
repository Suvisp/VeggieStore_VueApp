<template>
  <div class="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script setup>
import Navigation from '../src/components/Navigation.vue'

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>