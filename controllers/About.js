import app from '../app/app.js'

export default class About {
  async show () {
    await app.mvc.loadView('about')
  }
}
