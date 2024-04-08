import { createRouter, createWebHistory,} from 'vue-router';
import AuthService from '../authentification/authService'
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Chat from '@/views/Chat.vue';
import ChatList from '@/views/ChatList.vue';
import Theme from '@/views/Theme.vue';
import Settings from '@/views/Settings.vue';


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
    component: ChatList,
    meta: {requiresAuth: true}
  },
  {
    path: "/chat/:id",
    name: "GroupChat",
    component: Chat,
    meta: {requiresAuth: true}
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {requiresAuth: true}
  },
  {
    path: "/settings/theme",
    name: "ThemeSettings",
    component: Theme,
    meta: {requiresAuth: true}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


// Authentifizierung überprüfen, bevor eine Route navigiert wird
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthService.isAuthenticated()) {
      next({ path: '/' }); // Benutzer ist nicht authentifiziert, leite ihn zur Anmeldeseite weiter
    } else {
      next(); // Benutzer ist authentifiziert, erlaube Navigation
    }
  } else {
    next(); // Diese Route erfordert keine Authentifizierung, erlaube Navigation
  }
});

export default router;