<template>
  <AuthNavbar />
  <div class="h-[calc(100vh_-_64px)] flex flex-col items-center justify-center">
    <form class="max-w-md flex flex-col container px-4 mx-auto gap-y-3" @submit.prevent="onSubmit">

      <div class="flex-1 relative">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem v-auto-animate>
            <FormLabel for="username">Username</FormLabel>
            <FormControl>
              <Input type="text" id="username" ref="username" v-bind="componentField" autocomplete="Username" placeholder="Username" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="flex-1 relative">
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormLabel class="mt-2" for="password">Password</FormLabel>
            <FormControl>
              <div class="relative">
                <Input :type="!showPassword ? 'password' : 'text'" v-bind="componentField" autocomplete="password"
                  ref="password" placeholder="Password" class="pr-10" :class="{ 'border-red-500': passwordError }" />
                <span class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer px-2 "
                  @click="togglePassword">
                  <EyeOff v-if="!showPassword" class="size-6 text-muted-foreground" />
                  <Eye v-else class="size-6 text-muted-foreground" />
                </span>
              </div>
              <FormMessage />
            </FormControl>
          </FormItem>
        </FormField>
      <p v-if="errorMessage" class="text-start w-fit text-red-500 mt-2 flex justify-center">
        {{ errorMessage }}
      </p>
      </div>

      <div class="flex items-center mt-6">
        <FormField name="staylogged">
          <FormItem v-auto-animate class="flex gap-x-3 items-center">
            <Checkbox id="checkbox" ref="checked" />
            <FormLabel for="checkbox" class="text-sm !mt-0">Stay logged in</FormLabel>
          </FormItem>
        </FormField>
      </div>

      <Button class="mt-10" type="submit">
        Einloggen
      </Button>
    </form>
    <p class="text-center text-sm text-gray-500 mt-4">
      Don't have an account? <router-link to="/register" class="text-foreground">Register here</router-link>
    </p>
  </div>
</template>

<script setup>
import api from '../api/index';
import router from '../router/router'
import AuthNavbar from '@/components/AuthNavbar.vue';
import AuthService from '../authentification/authService'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import {
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
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const showPassword = ref(false)
const checked = ref(false)
const passwordError = ref(false)


const formSchema = toTypedSchema(z.object({
  username: z.string().regex(/^[a-zA-Z]{4}it\d{2}$/, 'Username must be in the format of 4 letters followed by 2 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
}))

const { handleSubmit } = useForm({ 
  validationSchema: formSchema,
  initialValues: {
    username: '',
    password: '',
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await api.login({
      userid: values.username,
      password: values.password
    });

    if (response.status === 'error') {
      errorMessage.value = response.message;
      return;
    }

    // Überprüft die Antwort von der API
    if (response && response.token) {
      //Token für  Authentifizierung setzen
      AuthService.setAuthToken(response.token);
      if (!localStorage.getItem('imageUrl')) {
        localStorage.setItem('imageUrl', JSON.stringify({ backgroundImage: '/img/backgrounds/bg_p_01.svg', type: 'pattern' }));
      }

      localStorage.setItem('token', JSON.stringify({ token: response.token, hash: response.hash }));
      // Token im localStorage speichern, wenn die Checkbox aktiviert ist

      console.log(checked.value);

      if (checked.value) {
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
    console.error('Error while logging in', error);
    this.errorMessage = 'Error while logging in: ' + error.message;
  }
})

defineProps({
  msg: String,
})

async function checkToken() {

  const stayLoggedToken = localStorage.getItem('tokenStayLogged');


  if (!stayLoggedToken) return;
  try {
    const response = await api.validatetoken(stayLoggedToken);
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

const togglePassword = () => {
  showPassword.value = !showPassword.value;
}

const validatePassword = () => {
  passwordError.value = password.value.length < 8;
}

// watch(password, () => {
//   validatePassword();
// })
</script>
