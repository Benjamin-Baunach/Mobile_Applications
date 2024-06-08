<template>
  <Navbar backroute="/chats" class="mb-0">
    <template #backbutton>
      <Button variant="ghost" size="icon" class="text-primary-600 !bg-transparent">
        <ChevronLeft class="w-6 h-6" />
      </Button>
    </template>
    <template #title>
      <div class="flex items-center flex-row gap-3">
        <p class="text-xl font-medium text-white">Settings</p>
      </div>
    </template>
  </Navbar>

  <div class="h-[calc(100vh_-_84px)] flex flex-col gap-y-9 justify-start px-8 py-4">
    <ListItem linkTo="/settings/theme" title="Theme" subtitle="Change the appearance of the app">
      <template #icon>
        <Palette class="w-6 h-6 text-neutral-400" />
      </template>
      <template #action>
        <Button variant="ghost" size="icon" class="text-primary-600 !bg-transparent">
          <ChevronRight class="w-6 h-6" />
        </Button>
      </template>
    </ListItem>
    <ListItem linkTo="">
      <template #icon>
        <ALargeSmall class="w-6 h-6 text-neutral-400" />
      </template>
      <template #content>
        <div class="flex flex-col flex-1">
          <div class="flex flex-col gap-y-1 justify-between items-start w-full">
              <p class="text-base text-neutral-950 dark:text-neutral-50">Font Size</p>
              <p class="text-sm text-neutral-400 dark:text-neutral-500">Change the font size of the app</p>
          </div>
          <Select v-model="selectedFontSize">
            <SelectTrigger class="w-full mt-3">
              <SelectValue placeholder="Select Font Size" />
            </SelectTrigger>
            <SelectContent class="dark:bg-background bg-white dark:text-neutral-50 !dark:border-neutral-400">
              <SelectItem value="small">
                Small
              </SelectItem>
              <SelectItem value="standard">
                Standard
              </SelectItem>
              <SelectItem value="large">
                Large
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </template>
    </ListItem>
    <LogoutDrawer>
      <template #trigger>
        <ListItem linkTo="" title="Logout" subtitle="Logout from your account">
          <template #icon>
            <LogOut class="w-6 h-6 text-[#FD627E]" />
          </template>
        </ListItem>
      </template>
    </LogoutDrawer>
  </div>

</template>

<script>
import { ChevronLeft, ChevronRight, Palette, LogOut, ALargeSmall } from 'lucide-vue-next';
import Navbar from '@/components/Navbar.vue';
import { Button } from '@/components/ui/button'
import ListItem from '@/components/ListItem.vue';
import LogoutDrawer from '@/components/LogoutDrawer.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default {
  name: 'Settings',
  components: {
    Navbar,
    Button,
    ListItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    LogOut,
    Palette,
    ChevronLeft,
    ChevronRight,
    ALargeSmall,
    LogoutDrawer,
  },
  data() {
    return {
      selectedFontSize: 'standard',
    }
  },
  methods: {
    setFontSize(size) {
      switch (size) {
        case 'small':
          document.documentElement.style.setProperty('--fs-setting', '-0.2rem');
          break;
        case 'standard':
          document.documentElement.style.setProperty('--fs-setting', '0rem');
          break;
        case 'large':
          document.documentElement.style.setProperty('--fs-setting', '0.25rem');
          break;
        default:
          document.documentElement.style.setProperty('--fs-setting', '0rem');
      }
    },
  },
  watch: {
    selectedFontSize() {
      this.setFontSize(this.selectedFontSize);
    }
  },
  mounted() {
    const fontSize = document.documentElement.style.getPropertyValue('--fs-setting');
    switch (fontSize) {
      case '-0.2rem':
        this.selectedFontSize = 'small';
        break;
      case '0rem':
        this.selectedFontSize = 'standard';
        break;
      case '0.25rem':
        this.selectedFontSize = 'large';
        break;
      default:
        this.selectedFontSize = 'standard';
    }
  }
}

</script>