<template>
   <div class="flex items-start gap-2.5 mt-3" v-if="!isCurrentUser">
      <!-- <div class="w-8 h-8 rounded-full bg-neutral-200" /> -->
      <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 border-gray-100 bg-gray-50 rounded-e-2xl rounded-s-2xl rounded-es-lg dark:bg-gray-700">
         <span class="text-sm font-medium text-gray-900 dark:text-white" :style="{ color : setColorBasedOnUser(message.userhash)} " v-html="message.usernickname" />
         <p class="text-sm font-normal text-gray-900 dark:text-white" v-html="message.text" />
         <Dialog>
            <DialogTrigger as-child>
               <img class="w-full h-auto cursor-pointer rounded-lg mt-2.5" v-if="message.photoid" :src="photo" />
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
   <div class="flex gap-2.5 mt-3 ml-auto" v-else>
      <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 border-primary-300 bg-primary-200 rounded-e-2xl rounded-s-2xl rounded-ee-lg dark:bg-primary-700 ml-auto">
         <p class="text-sm font-normal text-neutral-950 dark:text-white" v-html="message.text" />
      </div>
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
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // If the date is today, display only hour and minute
      if (date.toDateString() === today.toDateString()) {
         const options = { hour: 'numeric', minute: 'numeric' };
         return date.toLocaleTimeString(navigator.language, options);
      }

      // If the date is yesterday, display "yesterday"
      if (date.toDateString() === yesterday.toDateString()) {
         return 'Yesterday';
      }

      // If the date is within the last week, display weekday
      const diffInDays = Math.ceil((today - date) / (1000 * 60 * 60 * 24));
      if (diffInDays <= 7) {
         const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
         return date.toLocaleDateString(navigator.language, options);
      }

      // Otherwise, display the full date
      const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString(navigator.language, options);
   },
   async getPhotoFromMessage(photoId) {
      if (!this.message.photoid) return;
      const token = JSON.parse(localStorage.getItem('token'));
      const blob = await api.getphoto({token: token.token, photoId: photoId});
      const image = URL.createObjectURL(blob);
      this.photo = image;
   },
  },
  computed: {
      isCurrentUser() {
         return this.message.userhash === JSON.parse(localStorage.getItem('token')).hash;
      },
   },
}
</script>