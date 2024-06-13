<script setup>
//import HelloWorld from './components/HelloWorld.vue'

import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

import Header from './components/Header.vue'
import HomePage from './pages/HomePage.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="wrapper">
    <Header />

    <div class="main">
      <RouterView />
    </div>

    <Footer />

  </div>

</template>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  padding-top: 80px;
}
</style>
