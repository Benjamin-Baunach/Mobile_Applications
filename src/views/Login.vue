<script setup>
import api from '../api/index';
import router from '../router/router'
import Navbar from '@/components/Navbar.vue';

defineProps({
  msg: String,
})


async function checkToken() {
  const token = localStorage.getItem('token');
  console.log("Token WEB", token);

  if (token) {
    try {
      const response = await api.validatetoken(token);
      console.log(response);
      if (response && response.status === 'ok') {
        router.push({ path: '/chats' });
      } else {
        localStorage.removeItem('token');
        console.log("Wrong Token");
      }
    } catch (error) {
      console.error("Fehler", error);
      router.push({ path: '/chats' });
    }
  }
}

checkToken();

</script>

<template>
  <Navbar />
  <div class="h-[calc(100vh_-_84px)] flex flex-col items-center justify-center">
    <form class="max-w-md flex flex-col container px-4 mx-auto gap-y-3" @submit.prevent="login">
      <div class="flex flex-row gap-x-3">
        <div class="flex-1">
          <label for="username" class="block text-sm font-medium text-gray-700">Benutzername:</label>
          <input type="text" id="username" v-model="username" autocomplete="username" placeholder="Benutzername"
            required
            class="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div class="flex-1">
          <label for="password" class="block text-sm font-medium text-gray-700">Passwort:</label>
          <input type="password" id="password" v-model="password" autocomplete="current-password" placeholder="Passwort"
            required
            class="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="checkbox" v-model="checked"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
        <label for="checkbox" class="ml-2 block text-sm text-gray-900">Eingeloggt bleiben</label>
      </div>
      <button type="submit"
        class="w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Einloggen
      </button>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </form>
    <p class="text-center text-sm text-gray-500 mt-4">
      Hast du noch keinen Account? <router-link to="/register" class="text-blue-500">Registrieren</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Login_Page',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.login(this.username, this.password);
        // Überprüft die Antwort von der API
        if (response && response.token) {
          // Erfolgreich eingeloggt
          console.log(response.token);
          alert('Erfolgreich eingeloggt!');

          // Benutzer weiterleiten
          router.push({ path: '/chats' }); 
          // Token im localStorage speichern, wenn die Checkbox aktiviert ist
          if (this.checked) {
            localStorage.setItem('token', response.token);
          }
        } else {
          // Authentifizierung fehlgeschlagen
          this.errorMessage = 'Ungültige Benutzername oder Passwort.';
        }
      } catch (error) {
        // Bei einem Fehler die Fehlermeldung anzeigen
        console.error('Fehler beim Einloggen:', error);
        this.errorMessage = 'Fehler beim Einloggen: ' + error.message;
      }
    }
  }
};
</script>
