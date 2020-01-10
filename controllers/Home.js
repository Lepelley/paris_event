import app from '../app/app.js'

export default class Home {
  async show () {
    await app.mvc.loadView('home')
  }
}
