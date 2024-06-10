<script setup>
//import HelloWorld from './components/HelloWorld.vue'

import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

import Header from './components/Header.vue'
import Speedbar from './components/Speedbar.vue'
import MeetingSection from './components/MeetingSection.vue'
</script>

<template>
  <div class="wrapper">
    <Header />

    <Speedbar />

    <MeetingSection />
  </div>

</template>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
