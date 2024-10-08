(global => {
    'use strict';

    // Load the sw-toolbox library.
    importScripts('assets/js/vendors/sw-toolbox/sw-toolbox.js');

    // Turn on debug logging, visible in the Developer Tools' console.
    global.toolbox.options.debug = self.registration.scope.indexOf("localhost") !== -1;

    // By default, all requests that don't match our custom handler will use the
    // toolbox.networkFirst cache strategy, and their responses will be stored in
    // the default cache.
    global.toolbox.router.default = global.toolbox.networkFirst;

    //precache
    global.toolbox.precache([
        '/offline'
    ]);

    global.toolbox.router.get('/css*', global.toolbox.networkFirst);
    global.toolbox.router.get('/js*', global.toolbox.networkFirst);
    global.toolbox.router.get('/fonts*', global.toolbox.cacheFirst);
    global.toolbox.router.get('/images*', global.toolbox.cacheFirst);
    global.toolbox.router.get('/pwa*', global.toolbox.cacheFirst);

    global.toolbox.router.get('/', global.toolbox.networkFirst, {
        cache: {
            name: 'pages',
        }
    });


    // global.toolbox.router.get('/', global.toolbox.networkFirst, {
    //     cache: {
    //         name: 'images',
    //     }
    // });


    // Set up a handler for HTTP GET requests:
    // - /\.ytimg\.com\// will match any requests whose URL contains 'ytimg.com'.
    //   A narrower RegExp could be used, but j ust checking for ytimg.com anywhere
    //   in the URL should be fine for this sample.
    // - toolbox.cacheFirst let us to use the predefined cache strategy for those
    //   requests.
    // global.toolbox.router.get(/\.ytimg\.com\//, global.toolbox.cacheFirst, {
    // // Use a dedicated cache for the responses, separate from the default cache.
    // cache: {
    //     name: 'youtube-thumbnails',
    //     // Store up to 10 entries in that cache.
    //     maxEntries: 10,
    //     // Expire any entries that are older than 30 seconds.
    //     maxAgeSeconds: 30
    // }
    // });

    // Boilerplate to ensure our service worker takes control of the page as soon
    // as possible.
    global.addEventListener('install',
        event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate',
        event => event.waitUntil(global.clients.claim()));
})(self);