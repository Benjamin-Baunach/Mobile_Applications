<template>
  <Navbar backroute="/settings" class="mb-0">
    <template #backbutton>
      <Button variant="ghost" size="icon" class="text-primary-600 !bg-transparent">
        <ChevronLeft class="w-6 h-6" />
      </Button>
    </template>
    <template #title>
      <div class="flex items-center flex-row gap-3">
        <p class="text-xl font-medium">Theme</p>
      </div>
    </template>
  </Navbar>

  <div class="h-[calc(100vh_-_84px)] flex flex-col gap-y-9 justify-start px-8 py-4">
    <ListItem linkTo="/settings/theme" title="Theme" subtitle="Dark mode is easier on the eyes">
      <template #icon>
        <Palette class="w-6 h-6 text-neutral-400" />
      </template>
      <template #action>
        <Button variant="ghost" size="icon" class="text-primary-600 !bg-transparent" @click="darkMode ? setLightMode() : setDarkMode()">
          <Moon v-if="!darkMode" />
          <SunMedium v-else />
        </Button>
      </template>
    </ListItem>
    <ListItem linkTo="" title="Chat Background" subtitle="Change the chat background">
      <template #icon>
        <Image class="w-6 h-6 text-neutral-400" />
      </template>
    </ListItem>
    <BackgroundSelection />
  </div>

</template>

<script>
import { Palette, ChevronLeft, ChevronRight, Image, Moon, SunMedium } from 'lucide-vue-next';
import theme from '@/theme/index.js';
import Navbar from '@/components/Navbar.vue';
import { Button } from '@/components/ui/button'
import ListItem from '@/components/ListItem.vue';
import BackgroundSelection from '@/components/BackgroundSelection.vue';

export default {
  name: 'Theme',
  components: {
    Navbar,
    ListItem,
    Button,
    Moon,
    SunMedium,
    Image,
    Palette,
    ChevronLeft,
    ChevronRight,
    BackgroundSelection,
  },
  data() {
    return {
      darkMode: theme.isDarkMode(),
    }
  },
  methods: {
    setDarkMode() {
      this.darkMode = true;
      theme.setDarkMode();
    },
    setLightMode() {
      this.darkMode = false;
      theme.setLightMode();
    },
  }
}

</script>