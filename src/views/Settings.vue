<template>
  <Navbar backroute="/chats" class="mb-0">
    <template #backbutton>
      <Button variant="ghost" size="icon" class="text-primary-600 !bg-transparent">
        <ChevronLeft class="w-6 h-6" />
      </Button>
    </template>
    <template #title>
      <div class="flex items-center flex-row gap-3">
        <p class="text-xl font-medium">Settings</p>
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
import { ChevronLeft, ChevronRight, Palette, LogOut } from 'lucide-vue-next';
import Navbar from '@/components/Navbar.vue';
import { Button } from '@/components/ui/button'
import ListItem from '@/components/ListItem.vue';
import LogoutDrawer from '@/components/LogoutDrawer.vue';

export default {
  name: 'Settings',
  components: {
    Navbar,
    Button,
    ListItem,
    LogOut,
    Palette,
    ChevronLeft,
    ChevronRight,
    LogoutDrawer,
  },
}

</script>