

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import Speedbar from '../components/Speedbar.vue'

const route = useRoute();
const post = ref(null);

onMounted(async () => {
  const postId = route.params.id;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    post.value = {
      id: response.data.id,
      title: response.data.title,
      body: response.data.body,
      image: `https://via.placeholder.com/600/${Math.floor(Math.random() * 1000)}`
    };
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <Speedbar />

  <section class="meeting-view">
    <div class="meeting-view__container">
      <div class="meeting-view__header">
        <h1 v-if="post">{{ post.title }}</h1>
      </div>

      <div class="meeting-view__body">
        <div class="meeting-view__main">
          <article v-if="post">
            <p>{{ post.body }}</p>
            <img :src="post.image" alt="Post Image" />
          </article>

          <div v-else>
            <p>Loading...</p>
          </div>
        </div>

        <aside class="meeting-view__aside">
          <div class="widget-vote">
            <div class="widget-vote__wrapper">
              <h3 class="widget-vote__title">
                Опитування
              </h3>
              <div class="widget-vote__questions">
                <div class="vote-question">
                  <div class="vote-question__title">
                    Чи погоджуєтеся Ви з переліком інструментів державного регулювання, який пропонується для скасування?
                  </div>
                  <div class="vote-question__field">
                    <label for="yes">
                      <input id="yes" type="radio" name="radio1"> Так
                    </label>
                    <label for="not">
                      <input id="not" type="radio" name="radio1"> Ні
                    </label>
                  </div>
                </div>

                <div class="vote-question">
                  <div class="vote-question__title">
                    Якщо ні, вкажіть, який би інструмент Ви додали або виключили. Чому?
                  </div>
                  <div class="vote-question__field">
                    <textarea name="" id="textarea1" cols="30" rows="3" placeholder="Type here"></textarea>
                  </div>
                </div>

                <div class="vote-question">
                  <div class="vote-question__title">
                    У разі наявності інших пропозицій, пов’язаних з інструментами державного регулювання, вкажіть їх та зазначте шляхи вирішення
                  </div>
                  <div class="vote-question__field">
                    <textarea name="" id="textarea2" cols="30" rows="3" placeholder="Type here"></textarea>
                  </div>
                </div>
              </div>

              <div class="widget-vote__action">
                <button>Надіслати</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.meeting-view {
  &__container {}
  &__header {}
  &__body {
    display: flex;
    gap: 60px;
    margin-top: 80px;
  }
  &__main {
    flex: 1;
  }
  &__aside {
    width: 100%;
    max-width: 370px;
  }
}
</style>