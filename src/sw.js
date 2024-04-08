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

function handleNetworkStatusChange(event) {
    if (event.type === "offline") {
        // Handle offline status
        console.log('You are offline');
    } else if (event.type === "online") {
        // Handle online status
        console.log('You are online');
    }
}

self.addEventListener("offline", handleNetworkStatusChange);
self.addEventListener("online", handleNetworkStatusChange);