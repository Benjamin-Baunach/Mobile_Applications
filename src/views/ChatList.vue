<template>
  <Navbar />

  <div class="h-[calc(100vh_-_84px)] flex flex-col items-center justify-start">
    <div class="max-w-md flex flex-col container px-4 mx-auto gap-y-3">
      <ChatListItem name="Group" :lastActivity="lastMessage.time" :lastChatMessage="lastMessage.text" />
      
      <div class="fixed bottom-5 right-5">
        <button class="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-600 text-white">
          <MessageCircleMore class="w-6 h-6"  />
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import api from '@/api/index.js';
import Navbar from '@/components/Navbar.vue';
import ChatListItem from '@/components/ChatListItem.vue'
import { MessageCircleMore } from 'lucide-vue-next'

export default {
  name: 'ChatList',
  components: {
    Navbar,
    ChatListItem,
    MessageCircleMore
  },
  data() {
    return {
      lastMessage: []
    }
  },
  async mounted() {
    this.lastMessage = await this.getMessages();
  },
  methods: {
    async getToken() {
      const token = await api.login({ username: 'niepit00', password: 'MPissuss124.'});
      return token.token;
    },
    async getMessages() {
      const token = await this.getToken();
      let result = await api.getmessages({token: token});
      return result.messages[result.messages.length - 1] ?? 'No messages';
    }
  }
}

</script>