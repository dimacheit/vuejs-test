<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const meetings = ref([]);
const filters = ref({
  meetingType: '',
  meetingDate: '',
  searchText: ''
});

const currentPage = ref(1);
const itemsPerPage = ref(10);

onMounted(async () => { 
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    meetings.value = response.data.map(post => ({
      id: post.id,
      type: post.id % 3 === 0 ? 'органи' : (post.id % 2 === 0 ? 'залучені' : 'вибули'),
      name: post.title,
      date: new Date().toISOString().split('T')[0],
      participants: 'МОЗ, Мінфін'
    }));
    //console.log(meetings.value);
  } catch (error) {
    //console.error(error);
  }
});

const filteredMeetings = computed(() => {
  return meetings.value.filter(meeting => {
    const typeMatch = !filters.value.meetingType || meeting.type === filters.value.meetingType;
    const dateMatch = !filters.value.meetingDate || meeting.date === filters.value.meetingDate;
    const textMatch = !filters.value.searchText || meeting.name.toLowerCase().includes(filters.value.searchText.toLowerCase());
    return typeMatch && dateMatch && textMatch;
  });
});

const paginatedMeetings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  //console.log('filter:', filteredMeetings.value.slice(start, end));
  return filteredMeetings.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredMeetings.value.length / itemsPerPage.value);
});

const pagination = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const neighbors = 2;

  if (total <= 1) return [];

  if (total <= 5 + 2 * neighbors) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (current > neighbors + 2) pages.push('...');
    for (let i = Math.max(2, current - neighbors); i <= Math.min(total - 1, current + neighbors); i++) {
      pages.push(i);
    }
    if (current < total - (neighbors + 1)) pages.push('...');
    pages.push(total);
  }
  return pages;
});

const viewMeeting = (meeting) => {
  alert(`Перегляд засідання: ${meeting.name}`);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<template>
  <section class="meeting">
    <div class="meeting__container">
      <h2 class="meeting__title heading-h2">
        Засідання
      </h2>

      <div class="meeting__display">

        <div class="meeting-filter">
          <div class="meeting-filter__wrapper">
            <div class="meeting-filter__left">
              <div class="meeting-filter__select">
                <select v-model="filters.meetingType" id="meetingType">
                  <option value="">Всі</option>
                  <option value="залучені">Залучені органи</option>
                  <option value="органи">Засідання органів</option>
                  <option value="вибули">Вибули органи</option>
                </select>

              </div>

              <div class="meeting-filter__date">
                <input type="date" v-model="filters.meetingDate">
              </div>
            </div>

            <div class="meeting-filter__right">
              <div class="meeting-filter__search">
                <input type="text" v-model="filters.searchText" placeholder="Пошук засідання">
              </div>
            </div>
          </div>
        </div>

        <div class="meeting-table">
          <table>
            <thead>
            <tr>
              <th>Назва засідання</th>
              <th>Дата</th>
              <th>Залучені органи</th>
              <th></th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="meeting in paginatedMeetings" :key="meeting.id">
              <td>{{ meeting.name }}</td>
              <td>{{ meeting.date }}</td>
              <td>{{ meeting.participants }}</td>
              <td><button @click="viewMeeting(meeting)">Переглянути</button></td>
            </tr>
            <tr>
              <td>Засідання 1</td>
              <td>22.02.2023</td>
              <td>МОЗ, Мінфін</td>
              <td>Переглянути</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="meeting-navigation">
          <button class="meeting-navigation__link" @click="prevPage" :disabled="currentPage === 1">Попередня сторінка</button>
          <div class="meeting-navigation__bullet">
            <button
                v-for="page in pagination"
                :key="page"
                v-if="page !== '...'"
                @click="currentPage = page"
                :class="{ active: currentPage === page }"
            >
              {{ page }}
            </button>
            <span v-else>...</span>
          </div>
          <button class="meeting-navigation__link" @click="nextPage" :disabled="currentPage === totalPages">Наступна сторінка</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.meeting {
  &__container {}
  &__title {
    font-size: 48px;
    line-height: 1.125;
    font-weight: 700;
  }
  &__display {
    margin-top: 60px;
    background-color: #F6F6F6;
    border: 1px solid #E8E8E8;
    border-radius: 3px 3px 0 0;
  }
}

.meeting-filter {
  padding: 16px;
  &__wrapper {
    display: flex;
    justify-content: space-between;
  }
  &__left {
    display: flex;
    gap: 16px;
  }
  &__select {
    select {
      display: block;
      width: 100%;
      padding: 8px 12px 8px 12px;
      background-color: #fff;
      border: 1px solid #E8E8E8;
      border-radius: 3px;
    }
  }
  &__date {
    input[type="date"] {
      display: block;
      width: 100%;
      padding: 8px 12px 8px 12px;
      background-color: #fff;
      border: 1px solid #E8E8E8;
      border-radius: 3px;
    }
  }
  &__right {
    width: 100%;
    max-width: 400px;
  }
  &__search {
    input[type="text"] {
      display: block;
      width: 100%;
      padding: 8px 12px 8px 12px;
      background-color: #fff;
      border: 1px solid #E8E8E8;
      border-radius: 3px;
    }
  }
}

.meeting-table {
  table {
    width: 100%;
    table-layout: fixed;
    border-spacing: 0;
    thead {
      text-align: left;
      th{
        padding: 14px 16px;
      }
    }
    tbody {
      td{
        padding: 16px;
        background-color: #fff;
        border-bottom: 1px solid #F6F6F6;
      }
    }
  }
}

.meeting-navigation {
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  &__link {
    color: #485BC0;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 0;
    background-color: transparent;
  }
  &__bullet {
    display: flex;
    gap: 4px;
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      font-size: 14px;
      color: #484A4C;
      background-color: transparent;
      border: none;
      border-radius: 100%;
      &.active {
        color: #fff;
        background-color: #485BC0;
      }
    }
  }
}
</style>