console.log('SW: registered');

self.addEventListener('install', () => {
    console.log('SW: installed');
});

self.addEventListener('activate', () => {
    console.log('SW: activated');
});

self.addEventListener('fetch', (event) => {
    console.log('SW: fetch event', event);
});

self.addEventListener('message', (event) => {
    console.log('SW: message event', event.data);
});