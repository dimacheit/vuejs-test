<script setup>
import SpeedbarIcon from './icons/ic_round-keyboard-double-arrow-right.vue'
</script>

<template>
  <section class="speedbar">
    <div class="speedbar__container">
      <ul class="speedbar__list">
        <li><a href="#">Головна</a></li>
        <li>
          <SpeedbarIcon />
        </li>
        <li><a href="#">Засідання</a></li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.speedbar {
  &__container {}
  &__list {
    list-style: none;
    display: flex;
    align-content: center;
    gap: 6px;
    li {
      a {
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
}
</style>