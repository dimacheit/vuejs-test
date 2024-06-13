import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import Zasidannya from './Zasidannya.vue';
import MeetingView from './views/MeetingView.vue';
import MeetingPage from './pages/MeetingPage.vue';

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/zasidannya',
        component: Zasidannya
    },
    {
        path: '/meeting',
        name: 'MeetingPage',
        component: MeetingPage
    },
    {
        path: '/meeting/:id',
        name: 'MeetingView',
        component: MeetingView,
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;