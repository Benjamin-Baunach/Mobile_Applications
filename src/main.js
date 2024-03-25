import './style.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: App },
        { path: '/about', component: () => import('./App.vue') }
    ]
});

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./src/sw.js') .then(registration => {
        console.log('SW registered');
        console.log(registration);
    });
}

if (window.Notification) {
    const showNotification = text => {
        const options = { body: 'You should know', icon: 'icon.png'};
    const notification = new Notification('A new notification!', options);
    notification.addEventListener('click', () => alert('Notification clicked')
    ); };
    if (Notification.permission === 'granted') showNotification('was granted');
    else if (Notification.permission !== 'denied') { Notification.requestPermission(permission => {
    if (permission === 'granted') showNotification('newly granted');
    }); }
}

createApp(App)
    .use(router)
    .mount('#app')
