<template>
  <Navbar />

  <div class="h-[calc(100vh_-_84px)] flex flex-col items-center justify-start">
    <h1 class="text-3xl font-bold text-center">Theme</h1>
    <p class="text-center">Click the buttons below to change the theme.</p>

    <div class="mt-4">
      <button @click="setDarkMode" class="px-4 py-2 bg-gray-800 text-white rounded-md">Dark Mode</button>
      <button @click="setLightMode" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Light Mode</button>
    </div>
  </div>

</template>

<script>
import theme from '@/theme/index.js';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Theme',
  components: {
    Navbar,
  },
  methods: {
    setDarkMode() {
      theme.setDarkMode();
    },
    setLightMode() {
      theme.setLightMode();
    },
  }
}

</script>