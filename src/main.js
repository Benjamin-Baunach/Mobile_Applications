import './style.css'
import { createApp } from 'vue'
import router from './router/router'

import App from './App.vue'
//import './registerServiceWorker'

//Service Worker implementation
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js', {scope: "./"})
//         .then(registration => {
//           console.log('Service Worker registered:', registration);
//         })
//         .catch(error => {
//           console.error('Service Worker registration failed:', error);
//         });
//     });
//   }

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./src/sw.js') .then(registration => {
        console.log('SW registered');
        console.log(registration);
    });
}

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
    
createApp(App).use(router).mount('#app')
    