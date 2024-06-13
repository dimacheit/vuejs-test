<script setup>


import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SpeedbarIcon from './icons/ic_round-keyboard-double-arrow-right.vue'

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(path => path);
  const breadcrumbArray = [];
  let currentPath = '';

  pathArray.forEach((path, index) => {
    currentPath += `/${path}`;
    let name = '';

    if (path === 'zasidannya') {
      name = 'Засідання';
    } else if (route.params.id && index === pathArray.length - 1) {
      name = `Засідання ${route.params.id}`;
    } else {
      name = path;
    }

    breadcrumbArray.push({
      name,
      link: index < pathArray.length - 1 ? currentPath : null
    });
  });

  return breadcrumbArray;
});
</script>

<template>
  <section class="speedbar">
    <div class="speedbar__container">
      <ul class="speedbar__list">
        <li>
          <router-link to="/">Головна</router-link>
        </li>
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <li>
            <SpeedbarIcon />
          </li>
          <li >
            <router-link v-if="crumb.link" :to="crumb.link">{{ crumb.name }}</router-link>
            <span v-else>{{ crumb.name }}</span>
          </li>
        </template>

      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.speedbar {
  margin-bottom: 24px;
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