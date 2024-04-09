<script setup>
import api from '../api/index';
import router from '../router/router'
import AuthNavbar from '@/components/AuthNavbar.vue';
import AuthService from '../authentification/authService'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  EyeOff,
  Eye
} from 'lucide-vue-next'

defineProps({
  msg: String,
})


async function checkToken() {

  const stayLoggedToken = localStorage.getItem('tokenStayLogged');


  if (!stayLoggedToken) return;
  try {
    const response = await api.validatetoken(stayLoggedToken);
    console.log(response);
    if (response && response.status === 'ok') {
      router.push({ path: '/chats' });
    } else {
      localStorage.removeItem('token');
      console.log("Wrong Token");
    }
  } catch (error) {
    console.error("Fehler", error);
    router.push({ path: '/' });
  }
}

checkToken();

</script>

<template>
  <AuthNavbar />
  <div class="h-[calc(100vh_-_84px)] flex flex-col items-center justify-center">
    <form class="max-w-md flex flex-col container px-4 mx-auto gap-y-3" @submit.prevent="login">

      <div class="flex-1 relative">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem v-auto-animate>
            <FormLabel for="username">Username:</FormLabel>
            <FormControl>
              <Input type="text" id="username" v-model="username" autocomplete="Username" placeholder="Username"
                v-bind="componentField" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="flex-1 relative">
        <FormField>
          <FormItem v-auto-animate>
            <FormLabel class="mt-2" for="password">Password:</FormLabel>
            <FormControl>
              <div class="relative">
                <Input :type="!showPassword ? 'password' : 'text'" v-model="password" autocomplete="password"
                  ref="password" placeholder="Password" class="pr-10" :class="{ 'border-red-500': passwordError }" />
                <span class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer px-2 "
                  @click="togglePassword">
                  <EyeOff v-if="!showPassword" class="size-6 text-muted-foreground" />
                  <Eye v-else class="size-6 text-muted-foreground" />
                </span>
              </div>
              <FormDescription v-if="passwordError" class="text-red-500">Password must be at least 8 characters long.</FormDescription>
            </FormControl>
          </FormItem>
        </FormField>
      </div>

      <div class="flex items-center justify-center mt-6">
        <FormField>
          <FormItem v-auto-animate class="flex items-center">
            <Checkbox type="checkbox" id="checkbox" v-model="checked"
              class="h-7 w-7 text-green-500 focus:ring-green-500 border-gray-300 rounded-md" />
            <FormLabel for="checkbox" class="ml-2 block text-sm ">Stay logged in</FormLabel>
          </FormItem>
        </FormField>
      </div>

      <Button class="mt-10" type="submit">
        Einloggen
      </Button>
      <p v-if="errorMessage" class="text-center text-red-500 mt-2 flex justify-center">
        {{ errorMessage }}
      </p>
    </form>
    <p class="text-center text-sm text-gray-500 mt-4">
      Hast du noch keinen Account? <router-link to="/register" class="text-blue-500">Registrieren</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      showPassword: false,
      checked: false,
      passwordError: false,
    };
  },


  methods: {
    async login() {
      try {

        console.log("Username: ", this.username, " Passwort: ", this.password);
        const response = await api.login(this.username, this.password);
        // Überprüft die Antwort von der API
        if (response && response.token) {
          // Erfolgreich eingeloggt
          console.log(response.token);
          //Token für  Authentifizierung setzen
          AuthService.setAuthToken(response.token);
          if (!localStorage.getItem('imageUrl')) {
            localStorage.setItem('imageUrl', JSON.stringify({ backgroundImage: '/img/backgrounds/bg_p_01.svg', type: 'pattern' }));
          }

          localStorage.setItem('token', JSON.stringify({ token: response.token, hash: response.hash }));
          // Token im localStorage speichern, wenn die Checkbox aktiviert ist
          if (this.checked) {
            localStorage.setItem('tokenStayLogged', response.token)
          }
          // Benutzer weiterleiten
          router.push({ path: '/chats' });
        } else {
          // Authentifizierung fehlgeschlagen
          this.errorMessage = 'Ungültiger Benutzername oder Passwort.';
        }
      } catch (error) {
        // Bei einem Fehler die Fehlermeldung anzeigen
        console.error('Fehler beim Einloggen:', error);
        this.errorMessage = 'Fehler beim Einloggen: ' + error.message;
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validatePassword() {
      this.passwordError = this.password.length < 8;
    }
  },
  watch: {
    password() {
      this.validatePassword();
    }
  }
};
</script>
