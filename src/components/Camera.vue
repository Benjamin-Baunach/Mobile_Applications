<template>
    <div class="absolute bottom-0 left-0 right-0 top-0 bg-neutral-950 z-20">
        <Transition name="fade">
            <div v-if="!photo" class="relative flex justify-between flex-col p-4 h-full">
                <video ref="video" class="absolute top-0 left-0 right-0 bottom-0 z-0 my-auto" autoplay playsinline /> 
                <div class="flex items-center justify-between gap-2 z-10">
                    <X class="w-6 h-6 stroke-white" @click="switchOff" />
                </div>
                <div class="flex justify-between gap-4 z-50 mb-8 items-center px-5">
                    <span class="w-12 h-12" />
                    <div class="rounded-full w-16 h-16 border-2 border-white flex justify-center items-center">
                        <button class="w-14 h-14 bg-white rounded-full flex items-center justify-center active:bg-gray-200" @click="takePhoto" />
                    </div>
                    <button class="w-12 h-12 p-3 rounded-full bg-neutral-800 bg-opacity-75" @click="switchCamera">
                        <RefreshCw class="stroke-white w-full h-full" />
                    </button>
                </div>
            </div>
            <div v-else class="relative flex justify-between flex-col py-4 h-full">
                <div class="flex items-center justify-between gap-2 z-10 px-4">
                    <X class="w-6 h-6 stroke-white" @click="switchOff" />
                </div>
                <div class="absolute bottom-3 fle flex-col z-30 w-full transition-all duration-300">
                    <div class="w-full justify-between flex-row items-center flex gap-1.5 px-1 mb-2 z-10">
                        <div class="flex-1 flex justify-between gap-x-2.5 bg-white dark:bg-gray-700 px-2.5 py-3 rounded-full">
                            <SmilePlus @click="showEmojiPicker = !showEmojiPicker" class="cursor-pointer transition duration-300" :class="showEmojiPicker ? 'stroke-primary-500' : ''"/>
                            <input type="text" inputmode="unicode" class="bg-transparent flex-1 focus:outline-none overflow-y-hidden break-words" placeholder="Type a message..." v-model="message" @keyup.enter="sendMessage" />
                        </div>
                        <Button size="icon" class="h-12 w-12" @click="sendMessage">
                            <SendHorizontal class="w-6 h-6" />
                        </Button>
                    </div>
                    <Transition name="fade">
                        <EmojiPicker v-if="showEmojiPicker" :native="true" theme="light" @select="onSelectEmoji" class="!w-full z-20 !shadow-none !mb-0" />
                    </Transition>
                </div>
                <img :src="photo" class="absolute top-0 left-0 right-0 bottom-0 my-auto object-cover" />
            </div>
        </Transition>
    </div>
</template>

<script setup>
import api from '@/api';
import Button from '@/components/ui/button/Button.vue';
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { SendHorizontal, Camera as Cam, SmilePlus } from 'lucide-vue-next'
import 'vue3-emoji-picker/css'
import { X, RefreshCw } from 'lucide-vue-next'
</script>

<script>
export default {
    name: 'Camera',
    emits: ['close', 'message-send'],
    data() {
        return {
            cameraMode: 'user',
            videoNode: null,
            stream: undefined,
            photo: undefined,
            showEmojiPicker: false,
            message: '',
        };
    },
    mounted() {
        if (!this.requiresCamera()) return;
        this.videoNode = this.$refs.video;
        this.switchOn();
    },
    unmounted() {
    },
    methods: {
        switchOn() {
            navigator.mediaDevices.getUserMedia({
                video: { width: 1920, height: 1080, },
                audio: false,
                facingMode: this.cameraMode
            }).then(stream => {
                // this.$refs.video.srcObject = stream;
                this.videoNode.srcObject = this.stream = stream;
            });
        },
        switchOff() {
            this.videoNode.pause();
            this.stream.getTracks()[0].stop();
            this.$emit('close');
        },
        switchCamera() {
            if (this.cameraMode === 'user') {
                this.cameraMode = 'environment';
            } else {
                this.cameraMode = 'user';
            }
            this.switchOn();
        },
        requiresCamera() {
            if ('mediaDevices' in navigator) return true;
            alert('Camera not supported');
            return false;
        },
        activateCamera() {
            if (!this.requiresCamera()) return;
        },
        takePhoto(evt) {
            const canvas = document.createElement('canvas');
            canvas.width = this.videoNode.videoWidth;
            canvas.height = this.videoNode.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
            this.photo = context.canvas.toDataURL();
            this.videoNode.pause();
            this.stream.getTracks()[0].stop();
            evt.stopPropagation();
        },
        sendMessage() {
            const token = JSON.parse(localStorage.getItem('token'));
            api.sendPhotoMessage({ message: this.message, token: token.token, chatId: this.$route.params.id, photo: this.photo.substring(22) });
            this.photo = undefined;
            this.$emit('message-send');
        },
        onSelectEmoji(emoji) {
            this.message += emoji.i;
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
