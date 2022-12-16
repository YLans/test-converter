import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import ConverterPage from '@/views/ConverterPage.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/converter',
    name: 'converter',
    component: ConverterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
