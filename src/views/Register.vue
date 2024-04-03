<template>
  <Navbar />

  <div class="h-[calc(100vh_-_84px)] flex flex-col items-center justify-center">
    <form class="max-w-md flex flex-col container px-4 mx-auto gap-y-3" @submit="onSubmit">
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
      <FormField v-slot="{ componentField }" name="username">
        <FormItem v-auto-animate>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" autocomplete="nickname" placeholder="Username" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem v-auto-animate>
          <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" autocomplete="new-password" placeholder="Password" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              <div class="flex flex-row items-center gap-x-2">
                <span>Password must be at least 8 characters long</span>
              </div>
            </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="confirm">
        <FormItem v-auto-animate>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input type="password" autocomplete="new-password" placeholder="Confirm Password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button class="mt-10" type="submit">
        Create Account
      </Button>
      <p class="text-center text-sm text-gray-500 mb-10">
        Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
    </form>
  </div>

</template>

<script setup>
import {
  EyeOff,
  Eye
} from 'lucide-vue-next'
import api from '@/api/index.js';
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Navbar from '@/components/Navbar.vue'
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

const formSchema = toTypedSchema(z.object({
  fname: z.string(),
  lname: z.string(),
  username: z.string().min(4).max(20).regex(/^[a-zA-Z]{4}it\d{2}$/, 'Username must be in the format of 4 letters followed by 2 digits'),
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
    // await api.register(values);
    // router.push('/login');
    console.log(values);
  } catch (error) {
    console.error(error);
  }
});

</script>

<script>
export default {
  name: 'Register',
}
</script>