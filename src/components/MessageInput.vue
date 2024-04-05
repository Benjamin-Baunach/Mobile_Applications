<template>
    <Transition name="fade">
        <EmojiPicker v-if="showEmojiPicker" :native="true" theme="light" @select="onSelectEmoji" class="!w-full !shadow-none !mb-3" />
    </Transition>
    <div class="w-full justify-between flex-row items-center flex gap-4 px-2 mb-3 z-10">
        <div class="flex-1 flex justify-between gap-x-3 bg-gray-100 dark:bg-gray-700 px-3 py-4 rounded-2xl">
            <SmilePlus @click="openEmojiPicker" class="cursor-pointer transition duration-300" :class="openEmojiPicker===true ? 'stroke-primary-500' : ''"/>
            <input type="text" inputmode="unicode" class="bg-transparent flex-1 focus:outline-none overflow-y-hidden break-words" placeholder="Type a message..." v-model="message" @keyup.enter="sendMessage" />
            <Camera />
        </div>
        <Button size="icon" class="h-14 w-14" @click="sendMessage">
            <SendHorizontal class="w-6 h-6" />
        </Button>
    </div>
</template>

<script setup>
import api from '@/api';
import Button from '@/components/ui/button/Button.vue';
import router from '@/router/router'
import theme from '@/theme'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { SendHorizontal, Camera, SmilePlus } from 'lucide-vue-next'
</script>

<script>
export default {
    name: 'MessageInput',
    emits: ['openEmojiPicker'],
    data() {
        return {
            message: '',
            showEmojiPicker: false
        }
    },
    methods: {
        async sendMessage() {
            const token = JSON.parse(localStorage.getItem('token'));
            if (!this.message) return;
            await api.sendmessage({
                message: this.message,
                chatId: this.$route.params.id,
                token: token.token
            });
        },
        onSelectEmoji(emoji) {
            this.message += emoji.i;
        },
        openEmojiPicker() {
            this.showEmojiPicker = !this.showEmojiPicker;
            this.$emit('openEmojiPicker', this.showEmojiPicker);
        },
    },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: height 0.3s, opacity 0.3s;
}
.fade-enter, .fade-leave-to {
    height: 0!important;
    opacity: 0;
}
</style>
