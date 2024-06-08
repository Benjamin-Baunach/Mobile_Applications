<template>
  <div class="h-[-webkit-fill-available] overflow-y-hidden relative bg-transparent">
    <div class="absolute top-0 left-0 w-full h-full -z-20" :class="classes" />
    <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10" :class="bgClass" :style="style" />

    <Navbar backroute="/chats" class="mb-0">
      <template #backbutton>
        <Button variant="ghost" size="icon" class="text-primary-600 !bg-transparent">
          <ChevronLeft class="w-6 h-6" />
        </Button>
      </template>
      <template #title>
        <div class="flex items-center flex-row gap-2">
          <Avatar class="h-10 w-10 rounded-full flex items-center justify-center">
              <AvatarImage src="https://images.unsplash.com/photo-1583875762487-5f8f7c718d14?q=80&w=512&h=512&fit=crop" alt="Chat-Image" />
              <AvatarFallback class="h-14 w-14 rounded-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800" />
          </Avatar>
          <p class="text-xl font-medium text-white">Birthday Party</p>
        </div>
      </template>
    </Navbar>

    <div ref="scrollContainer"
      @scroll="onScroll"
      class="flex flex-col items-center justify-start overflow-y-scroll transition-all duration-300"
      :class="isEmojiPickerOpen === false ? 'h-[calc(100dvh_-_127px)]' : 'h-[calc(100dvh_-_458px)]'"
    >
      <div class="max-w-md flex flex-col container px-4 mx-auto gap-y-3 mt-3">
        <!-- Add day for each  -->
        <div v-for="(mdg, i) in messages" :key="mdg.id" class="text-xs text-neutral-800 dark:text-gray-400 last:mb-3 relative">
          <div class="text-center backdrop-blur-sm border border-gray-50/50 sticky top-3 bg-gray-50 dark:bg-neutral-800 w-max mx-auto px-2 py-1.5 rounded-lg bg-opacity-80 shadow-sm last:mb-3">
            <p class="text-xs text-neutral-800 dark:text-white">{{ i }}</p>
          </div>
          <Message v-for="(message, index) in mdg" :key="index" :message="message" :is-last="i === mdg.length-1" />
        </div>
      </div>
    </div>
    <MessageInput
      @message-send="async () => await handleMessageSent()"
      @openEmojiPicker="(e) => openEmojiPicker(e)"
      @scroll-to-last="scrollToBottom"
      :isScrolledDown="scrolledAtBottom"
    />
  </div>
</template>

<script setup>
import api from '@/api/index.js';
import Navbar from '@/components/Navbar.vue';
import Message from '@/components/Message.vue';
import MessageInput from '@/components/MessageInput.vue';
import Button from '@/components/ui/button/Button.vue';
import { ChevronLeft } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

</script>

<script>
export default {
  name: 'ChatList',
  data() {
    return {
      messages: [],
      isEmojiPickerOpen: false,
      scrolledAtBottom: false,
    }
  },
  async mounted() {
    // Start polling when the component is created
    await this.startPolling().then(() => {
      this.scrollToBottom();
    });
  },
  methods: {
    async startPolling() {
      // Fetch data initially
      await this.getMessages();
    },
    async getMessages() {
      const token = JSON.parse(localStorage.getItem('token'));
      const result = await api.getmessages({ token: token.token });
      this.messages = this.groupMessagesByDate(result.messages) ?? 'No messages';
      setTimeout(this.getMessages, 5000); // Poll every 5 seconds
    },
    scrollToBottom() {
      this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight;
    },
    // Group messages by date
    groupMessagesByDate(messages) {
      const groupedMessages = {};

      messages.forEach(message => {
        const date = this.formattedDate(message.time);
        if (!groupedMessages[date]) {
          groupedMessages[date] = [];
        }
        groupedMessages[date].push(message);
      });

      return groupedMessages;
    },
    // Date formatting
    checkLastTime(index) {
      return index === 0 || this.formattedDate(this.messages[index].time) !== this.formattedDate(this.messages[index - 1].time);
    },
    formattedDate(time) {
      const dateParts = time.split('_');
      const date = new Date(dateParts[0].replace(/-/g, '/') + ' ' + dateParts[1].replace(/-/g, ':'));
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // If the date is today, display only hour and minute
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      }

      // If the date is yesterday, display "yesterday"
      if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      }

        // If the date is within the last week, display weekday
        const diffInDays = Math.ceil((today - date) / (1000 * 60 * 60 * 24));
        if (diffInDays <= 7) {
          const options = { weekday: 'long' };
          return date.toLocaleDateString('en-US', options);
        }

        // Otherwise, display the full date
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    },
    // Open emoji picker
    openEmojiPicker(e) {
      this.isEmojiPickerOpen = e;
      // scroll after 300ms
      setTimeout(() => this.scrollToBottom(), 400);
    },
    async handleMessageSent() {
      await this.getMessages();
      this.scrollToBottom();
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.scrolledAtBottom = true;
      } else {
        this.scrolledAtBottom = false;
      }
    },
  },
  computed: {
    style() {
      const imageUrl = JSON.parse(localStorage.getItem('imageUrl'));
      return `background-image: url(${imageUrl.backgroundImage})`;
    },
    classes() {
      const imageUrl = JSON.parse(localStorage.getItem('imageUrl'));
      return imageUrl.type === 'pattern' ? 'bg-opacity-10 bg-yellow-800 dark:bg-neutral-950' : '';
    },
    bgClass() {
      const imageUrl = JSON.parse(localStorage.getItem('imageUrl'));
      return imageUrl.type === 'pattern' ? 'opacity-50 dark:opacity-10 invert' : '';
    },
  },
}
</script>