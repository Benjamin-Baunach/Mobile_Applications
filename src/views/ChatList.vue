<template>
  <div class="h-screen">
    <Navbar>
      <template #title>
        <div class="flex items-center flex-row gap-4 " >
          <img src="@/assets/chat.png" alt="Vue logo" class="h-8" />
          <p class="logo">BubbleChat</p>
        </div>
      </template>
      <template #right>
        <RouterLink to="/settings">
          <button class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white">
            <UserRound class="w-6 h-6" />
          </button>
        </RouterLink>
      </template>
    </Navbar>

    <div class="h-fill flex flex-col items-center justify-start pt-3">
      <div class="max-w-md flex flex-col container px-4 mx-auto gap-y-3">
        <ChatListItem name="Group" :id="lastMessage.chatid" :lastActivity="lastMessage.time" :lastChatMessage="lastMessage.text" />
        
        <div class="fixed bottom-5 right-5">
          <button class="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-600 text-white">
            <MessageCircleMore class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import api from '@/api/index.js';
import Navbar from '@/components/Navbar.vue';
import ChatListItem from '@/components/ChatListItem.vue'
import { MessageCircleMore, UserRound } from 'lucide-vue-next'
</script>

<script>

export default {
  name: 'ChatList',
  data() {
    return {
      lastMessage: []
    }
  },
  async mounted() {
    this.lastMessage = await this.getMessages();
  },
  methods: {
    async getMessages() {
      const token = JSON.parse(localStorage.getItem('token'));
      let result = await api.getmessages({token: token.token});
      return result.messages[result.messages.length - 1] ?? 'No messages';
    },
  }
}

</script>
