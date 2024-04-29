<template>
    <div class="w-full justify-between flex-row items-center flex gap-1.5 px-1 mb-2 z-10 relative">
        <div v-if="!isScrolledDown" class="flex items-center absolute right-2 -top-full">
            <Button size="icon" @click="$emit('scrollToLast')">
                <ChevronsDown class="w-5 h-5" />
            </Button>
        </div>
        <div class="flex-1 flex justify-between gap-x-2.5 bg-white dark:bg-gray-700 px-2.5 py-3 rounded-full">
            <SmilePlus @click="openEmojiPicker" class="cursor-pointer transition duration-300" :class="showEmojiPicker ? 'stroke-primary-500' : ''"/>
            <input type="text" inputmode="unicode" class="bg-transparent flex-1 focus:outline-none overflow-y-hidden break-words" placeholder="Type a message..." v-model="message" @keyup.enter="sendMessage" />
            <Cam @click="showCamera = !showCamera" class="cursor-pointer transition duration-300" :class="showCamera ? 'stroke-primary-500' : ''"/>
        </div>
        <Button size="icon" class="h-12 w-12" @click="sendMessage">
            <SendHorizontal class="w-6 h-6" />
        </Button>
    </div>
    <Transition name="fade">
        <EmojiPicker v-if="showEmojiPicker" :native="true" theme="light" @select="onSelectEmoji" class="!w-full !shadow-none !mb-0" />
    </Transition>
    <Transition name="fade">
        <Camera v-if="showCamera" @close="showCamera = false" @message-send="clearMessage"/>
    </Transition>
</template>

<script setup>
import api from '@/api';
import Button from '@/components/ui/button/Button.vue';
import Camera from '@/components/Camera.vue';
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { SendHorizontal, Camera as Cam, SmilePlus, ChevronsDown, ApertureIcon } from 'lucide-vue-next'
</script>

<script>


export default {
    name: 'MessageInput',
    emits: ['openEmojiPicker', 'message-send', 'scrollToLast'],
    data() {
        return {
            message: '',
            showEmojiPicker: false,
            showCamera: false
        }
    },
    props: {
        isScrolledDown: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        async sendMessage() {
            
            const token = JSON.parse(localStorage.getItem('token'));
            console.log(this.$route.params.id);
            if (!this.message) return;
            await api.sendmessage({
                message: this.message,
                chatId: this.$route.params.id,
                token: token.token
            });
            this.clearMessage();
        },
        onSelectEmoji(emoji) {
            this.message += emoji.i;
        },
        openEmojiPicker() {
            this.showEmojiPicker = !this.showEmojiPicker;
            this.$emit('openEmojiPicker', this.showEmojiPicker);
        },
        clearMessage() {
            this.message = '';
            this.$emit('message-send');
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
