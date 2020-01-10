import app from '../app/app.js'
import config from '../app/config.js'

export default class Login {
  async show () {
    await app.mvc.loadView('login')
    this.listener('google-connect', new firebase.auth.GoogleAuthProvider())
    this.listener('github-connect', new firebase.auth.GithubAuthProvider())
    this.listener('facebook-connect', new firebase.auth.FacebookAuthProvider())
  }

  listener (buttonElement, provider) {
    document.getElementById(buttonElement).addEventListener('click', (event) => {
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken
        // console.log(token)
        // The signed-in user info.
        app.dom.renderInElement(document.getElementById('loginName'), result.user.displayName)
        app.mvc.router.navigateTo('')
      }).catch((error) => {
        // Handle Errors here.
        console.error(error.code)
        console.error(error.message)
        // The email of the user's account used.
        console.error(error.email)
        // The firebase.auth.AuthCredential type that was used.
        console.error(error.credential)
      })
    })
  }
}
