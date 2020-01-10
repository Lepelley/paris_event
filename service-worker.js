self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('paris_events_1.0.0').then((cache) => {
      return cache.addAll([
        '/', // main route
        'index.html', // entry point
        // le JS de l'application
        '/app/app.js',
        '/app/config.js',
        '/app/main.js',
        // Les controllers
        '/controllers/About.js',
        '/controllers/Home.js',
        '/controllers/Login.js',
        '/controllers/Search.js',
        // Le model
        '/models/ParisEvents.js',
        // Le css
        '/static/css/main.css',
        '/static/css/bootstrap-social.css',
        '/static/css/style.css',
        // Les images
        '/static/images/subtle-grey.png',
        // Les vues
        '/views/about.html',
        '/views/index.html',
        '/views/login.html',
        '/views/search.html',
        // le router vanilla
        '/node_modules/vanilla-router/dist/vanilla-router.js'
      ]).then(() => {
        [
          'https://code.jquery.com/jquery-3.4.1.slim.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/flat-ui/2.3.0/css/flat-ui.min.css',
          'https://fonts.googleapis.com/css?family=Poiret+One',
          'https://kit.fontawesome.com/83cb94d8b6.js',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
          'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js'
        ].forEach((lib) => fetch(lib).then(res => cache.put(lib, res)))
      })
      // Response-Type = opaque
        .then(() => {
          [
            'https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js',
            'https://www.gstatic.com/firebasejs/7.6.1/firebase-auth.js',
          ].forEach((libUrl) => {
            const lib = new Request(libUrl, { mode: 'no-cors' })
            fetch(lib).then(res => cache.put(lib, res))
          })
        })
        .then(() => {
          /* Utilisez cette méthode avec Clients.claim () pour vous assurer que les mises à jour de l'agent de service sous-jacent prennent effet immédiatement pour le client actuel et tous les autres clients actifs. */
          self.skipWaiting()
        })
        .catch(console.log)
    })
  )
})

// dynamic cache (navigation)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.delete('events-cache-dynamic').then(() => self.clients.claim())
  )
})

// systeme de chargement des fichiers (soit http si connecté soit en cache si existant et non connecté)
self.addEventListener('fetch', (event) => {
  caches.match(event.request)
    .then(response => {
      const data = response || fetch(event.request)
      // console.log(data)
      return data.then(responseFetch => {
        caches.open('events-cache-dynamic')
          .then(cache => cache.put(event.request, responseFetch))
        return responseFetch.clone()
      })
    })
})
