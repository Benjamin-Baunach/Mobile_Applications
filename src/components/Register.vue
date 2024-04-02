<script setup>
import { EyeOff } from 'lucide-vue-next';
import InputFormField from './components/InputFormField.vue';
</script>

<template>
  <InputFormField label="Password" :input="{ type: 'password', name: 'password', value: input }" :validate="{ condition: false, label: 'Incorrect password. Please check your password.'}">
    <template #icon>
      <EyeOff />
    </template>
  </InputFormField>
</template>

<script>
import api from './api/index.js';
export default {
  name: 'App',
  components: {
    InputFormField
  },
  data() {
    return {
      msg: 'Vite + Vue',
      input: '',
    }
  },
  computed: {
    isPasswordValid() {
      return this.input === 'password';
    }
  },
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
