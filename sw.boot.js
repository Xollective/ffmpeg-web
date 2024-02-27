var serviceWorkerVersion = 4;
var forceLoadServiceWorker = false;
var disableServiceWorker = false;
// Logic in the following block is used to force a reload of the service worker on every refresh
// uncomment out of debugging purposes.
//forceLoadServiceWorker = true;
//const randomNumber = Math.floor(Math.random() * 10000);
//serviceWorkerVersion = randomNumber;
if (disableServiceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.unregister();
        }
    });
}
else if (("serviceWorker" in navigator)) {
    // Register service worker
    navigator.serviceWorker.register("sw.headers.js?v=" + serviceWorkerVersion).then(function (registration) {
        console.log("COOP/COEP Service Worker registered", registration.scope);
        // If the registration is active, but it's not controlling the page
        if ((registration.active && !navigator.serviceWorker.controller) || (typeof SharedArrayBuffer === 'undefined')) {
            window.location.reload();
        }
    }, function (err) {
        console.log("COOP/COEP Service Worker failed to register", err);
    });
}
else {
    console.warn("Cannot register a service worker");
}
navigator.serviceWorker.onmessage = function (event) {
    console.log('Message received from service worker:', event.data);
};
var svcworker = navigator.serviceWorker.controller;
if (svcworker) {
    svcworker.postMessage("hello sw");
}
//# sourceMappingURL=serviceworker.boot.js.map