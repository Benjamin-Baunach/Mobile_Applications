import './style.css'
import { createApp } from 'vue'
import router from './router/router'
import { store } from './store.js'
import api from '@/api';

import App from './App.vue'

if (window.Notification) {
    // const showNotification = text => {
    //     const options = { body: 'You should know', icon: 'icon.png'};
    //     const notification = new Notification('A new notification!', options);
    //     notification.addEventListener('click', () => alert('Notification clicked')
    //     ); };
    //     if (Notification.permission === 'granted') showNotification('was granted');
    //     else if (Notification.permission !== 'denied') { Notification.requestPermission(permission => {
    //         if (permission === 'granted') showNotification('newly granted');
    //     }); }
}

// if switch from offline to online get localstorage and send to server
window.addEventListener('online', () => {
    console.log('online');
    const token = JSON.parse(localStorage.getItem('token'));
    if (token === null || store.messages.length === 0) return;
    store.messages.forEach(m => {
        m.photo !== null ? api.sendPhotoMessage({token: token, message: m.message, photo: m.photo, chatid: m.chatId}) : api.sendmessage({token: token, message: m.message, chatid: m.chatId});
    });
    store.clearMessages();
})
    
createApp(App).use(router).mount('#app')
    