import { createRouter, createWebHistory,} from 'vue-router';
import TestPage from '../components/TestPage.vue';
import LoginPage from '../components/Login_Page.vue';


const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/Chats",
    name: "Chats", 
    component: TestPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;