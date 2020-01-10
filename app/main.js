import app from './app.js'
import config from './config.js'

import HomeController from '../controllers/Home.js'
import AboutController from '../controllers/About.js'
import SearchController from '../controllers/Search.js'
import LoginController from '../controllers/Login.js'

function initializeRouter () {
  app.mvc.router = (new Router({
    mode: 'hash',
    root: '/index.html',
    page404: (path) => console.error('"/' + path + '" Page not found')
  }))
    .add('/', async () => {
      (new HomeController()).show()
    })
    .add('/search', async () => {
      (new SearchController()).show()
    })
    .add('/about', async () => {
      (new AboutController()).show()
    })
    .add('/login', async () => {
      (new LoginController()).show()
    })
    .check()
    .addUriListener()
}

document.addEventListener('DOMContentLoaded', () => {
  initializeRouter()
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase);
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('../service-worker.js')
        .then((reg) => {
          let deferredPrompt
          const btnApp = document.getElementById('webApp')

          window.addEventListener('beforeinstallprompt', (event) => {
            deferredPrompt = event
            btnApp.style.display = 'block'
          })

          app.dom.on('webApp', 'click', (e) => {
            e.preventDefault()

            btnApp.style.display = 'none'
            deferredPrompt.prompt()
            deferredPrompt.userChoice.then(() => {
              btnApp.parentNode.removeChild(btnApp)
            })
          })
        })
    })
  }
})
