<template>
   <div class="flex flex-col max-w-[320px]" :id="isLast && 'last-message'" v-if="!isCurrentUser">
      <div  class="flex items-start gap-2.5 mt-3">
         <!-- <div class="w-8 h-8 rounded-full bg-neutral-200" /> -->
         <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 border-gray-100 bg-gray-50 rounded-e-2xl rounded-s-2xl rounded-es-lg dark:bg-gray-700">
            <span class="text-sm font-medium text-gray-900 dark:text-white" :style="{ color : setColorBasedOnUser(message.userhash)} " v-html="message.usernickname" />
            <p class="text-sm font-normal text-gray-900 dark:text-white" v-html="formatMessage(message.text)" />
            <Dialog>
               <DialogTrigger as-child>
                  <img class="w-full cursor-pointer rounded-lg mt-2.5 h-52" v-if="message.photoid" :src="photo" />
               </DialogTrigger>
               <DialogContent class="w-screen bg-transparent border-none shadow-none h-[50vh] text-white py-0 px-2">
                  <DialogHeader />
                  <div>
                     <img class="w-full h-auto cursor-pointer rounded-lg mt-2.5" v-if="message.photoid" :src="photo" />
                     <p class="text-sm font-normal text-white dark:text-white mt-3" v-html="message.text" />
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-auto mr-2">{{ formattedDate(message.time) }}</p>
   </div>
   <div class="flex justify-end flex-col" :id="isLast && 'last-message'" v-else>
      <div class="flex w-full gap-2.5 mt-3 ml-auto">
         <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 border-primary-300 bg-primary-200 rounded-e-2xl rounded-s-2xl rounded-ee-lg dark:bg-primary-700 ml-auto">
            <p class="text-sm font-normal text-neutral-950 dark:text-white" v-html="formatMessage(message.text)" />
            <Dialog>
               <DialogTrigger as-child>
                  <img class="w-full cursor-pointer rounded-lg mt-2.5 h-52" v-if="message.photoid" :src="photo" />
               </DialogTrigger>
               <DialogContent class="w-screen bg-transparent border-none shadow-none h-[50vh] text-white py-0 px-2">
                  <DialogHeader />
                  <div>
                     <img class="w-full h-auto cursor-pointer rounded-lg mt-2.5" v-if="message.photoid" :src="photo" />
                     <p class="text-sm font-normal text-white dark:text-white mt-3" v-html="message.text" />
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-auto">{{ formattedDate(message.time) }}</p>
   </div>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import api from '@/api/index.js';
</script>

<script>
export default {
  name: 'Message',
  props: {
      message: {
         type: Object,
         required: true
      },
      isLast: {
         type: Boolean,
         default: false
      }
  },
  data() {
      return {
         photo: null
      }
  },
  mounted() {
      this.getPhotoFromMessage(this.message.photoid);
  },
  methods: {
   setColorBasedOnUser(id) {
   // Generate a hash code for the ID
   const hashCode = id.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
   }, 0);

   // Convert the hash code to a color in hexadecimal format
   const color = '#' + Math.abs(hashCode).toString(16).slice(0, 6);

   return color;
   },
   formattedDate(time) {
      const dateParts = time.split('_');
      const date = new Date(dateParts[0].replace(/-/g, '/') + ' ' + dateParts[1].replace(/-/g, ':'));
      const options = { hour: 'numeric', minute: 'numeric' };
      return date.toLocaleTimeString(navigator.language, options);
   },

   async getPhotoFromMessage(photoId) {
      if (!this.message.photoid) return;
      const token = JSON.parse(localStorage.getItem('token'));
      const blob = await api.getphoto({token: token.token, photoId: photoId});
      const image = URL.createObjectURL(blob);
      this.photo = image;
   },

   formatMessage(message) {
      // if the message include a link, replace it with an anchor tag
      if (!message) return '';
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return message.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
   },
   getFaviconFromUrl(message) {
      const url = message.match(/(https?:\/\/[^\s]+)/g);
      if (!url) return '';
      const domain = new URL(url[0]).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}`;
   },
  },
  computed: {
      isCurrentUser() {
         return this.message.userhash === JSON.parse(localStorage.getItem('token')).hash;
      },
   },
}
</script>