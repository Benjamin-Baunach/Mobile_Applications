<template>
 
    <AuthNavbar />
    
    <div class="h-[calc(100vh_-_64px)] flex flex-col items-center overflow-y-auto">
      <form class="max-w-md flex flex-col container px-4 mx-auto gap-y-3 mt-10" :class="{ 'opacity-50 blur-none' : success}" @submit="onSubmit">
      <div class="flex flex-row gap-x-3">
        <FormField v-slot="{ componentField }" name="fname">
          <FormItem v-auto-animate>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input type="text" autocomplete="given-name" placeholder="First Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="lname">
          <FormItem v-auto-animate>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input type="text" autocomplete="family-name" placeholder="Last Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormField v-slot="{ componentField }" name="nickname">
        <FormItem v-auto-animate>
          <FormLabel>Nickname *  </FormLabel>
          <FormControl>
            <Input type="text" autocomplete="username" placeholder="Nickname" v-bind="componentField" />
          </FormControl>
          <FormMessage class="mt-2 max-h-12 overflow-y-auto" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="username">
        <FormItem v-auto-animate>
          <FormLabel>Username *</FormLabel>
          <FormControl>
            <Input type="text" autocomplete="nickname" placeholder="Username" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem v-auto-animate>
          <FormLabel>Password *</FormLabel>
          <FormControl>
            <div class="relative items-center select-none">
              <Input :type="!showPassword ? 'password' : 'text'" autocomplete="current-password" ref="password" placeholder="Password" v-bind="componentField" class="pr-10"/>
              <span class="absolute end-0 inset-y-0 flex items-center cursor-pointer justify-center px-2 " @click="togglePassword">
                <EyeOff v-if="!showPassword" class="size-6 text-muted-foreground" />
                <Eye v-else class="size-6 text-muted-foreground" />
              </span>
            </div>
          </FormControl>
          <FormDescription>
              <div class="flex flex-row items-center gap-x-2">
                
              </div>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="confirm">
          <FormItem v-auto-animate>
            <FormLabel>Confirm Password *</FormLabel>
            <FormControl>
              <div class="relative items-center select-none">
                <Input :type="!showConfirm ? 'password' : 'text'" autocomplete="new-password" ref="confirm" placeholder="Confirm Password" v-bind="componentField" class="pr-10"/>
                <span class="absolute end-0 inset-y-0 flex items-center cursor-pointer justify-center px-2" @click="toggleConfirm">
                  <EyeOff v-if="!showConfirm" class="size-6 text-muted-foreground" />
                  <Eye v-else class="size-6 text-muted-foreground" />
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button class="mt-10" type="submit">
          Create Account
        </Button>
        <p class="text-center text-sm text-gray-500 mb-10">
          Already have an account? <router-link to="/" class="text-blue-500">Login</router-link>
        </p>
      </form>
      <div v-if="success" class="absolute bottom-1/4 right-0 z-10 left-0 flex flex-col justify-center items-center">
        <Vue3Lottie :animationData="confettiJSON" :height="250" :width="250" />
      </div>
    </div>
    
  
</template>

<script setup>
import {
  EyeOff,
  Eye
} from 'lucide-vue-next'
import api from '@/api/index.js';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Vue3Lottie } from 'vue3-lottie'
import AuthNavbar from '@/components/AuthNavbar.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import confettiJSON from '@/assets/animations/confetti.json'

const showPassword = ref(false);
const showConfirm = ref(false);
const success = ref(false);
const router = useRouter();

const formSchema = toTypedSchema(z.object({
  fname: z.string(),
  lname: z.string(),
  nickname: z.string().min(6),
  username: z.string().regex(/^[a-zA-Z]{4}it\d{2}$/, 'Username must be in the format of 4 letters followed by 2 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirm: z.string().min(8, 'Password must be at least 8 characters long'),
}).refine((data) => data.confirm === data.password, {
    message: 'Passwords do not match',
    path: ['confirm']
}))

const { handleSubmit } = useForm({ 
  validationSchema: formSchema,
  initialValues: {
    username: '',
    password: '',
    confirm: '',
    fname: '',
    lname: '',
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await api.register({
      userid: values.username,
      password: values.password,
      nickname: values.nickname,
      fullname: `${values.fname} ${values.lname}`,
    }).then((res) => {
      success.value = true;
      setTimeout(() => {
        router.push({ path: '/login' })
      }, 1800);
    });
  } catch (error) {
    console.error(error);
  }
});

const togglePassword = () => showPassword.value = !showPassword.value;

const toggleConfirm = () =>  showConfirm.value = !showConfirm.value;

</script>

<script>
export default {
  name: 'Register',
}
</script>