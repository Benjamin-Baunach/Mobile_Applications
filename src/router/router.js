import { createRouter, createWebHistory,} from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Chat from '@/views/Chat.vue';
import ChatList from '@/views/ChatList.vue';
import Theme from '@/views/Theme.vue';


const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/chats",
    name: "ChatList",
    component: ChatList
  },
  {
    path: "/chat/:id",
    name: "GroupChat",
    component: Chat
  },
  {
    path: "/settings",
    name: "Settings",
    component: Chat
  },
  {
    path: "/settings/theme",
    name: "ThemeSettings",
    component: Theme
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;