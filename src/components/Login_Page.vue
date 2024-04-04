<script setup>
import { ref } from 'vue'
import api from '../api/index';
import App from '../App.vue';
import router from '../router/router'

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
        router.push({ path: "/Chats" }); // Redirect immediately
      } else {
        localStorage.removeItem('token');
        console.log("Wrong Token");
      }
    } catch (error) {
      console.error("Fehler", error);
    }
  }
}

checkToken();

</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Benutzername:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Passwort:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <input type="checkbox" id="checkbox" v-model="checked">
      <label for="checkbox">eingeloggt bleiben</label>
      <div>
      </div>
      <button type="submit">Einloggen</button>
      <router-link :to="{ path: '/RegisterPage' }">
        <button type="button">Register</button>
      </router-link>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name : 'Login_Page',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      console.log(this.checked);
      try {
        const response = await api.login(this.username, this.password);
        // Überprüft die Antwort von der API
        if (response && response.token) {
          // Erfolgreich eingeloggt
          console.log(response.token);
          alert('Erfolgreich eingeloggt!');

          // Benutzer weiterleiten
          router.push({ name: 'Chats' });

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

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: #ff0000;
  margin-top: 10px;
}
</style>
