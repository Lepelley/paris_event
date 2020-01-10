import app from '../app/app.js'
import ParisEvents from '../models/ParisEvents.js'

export default class Search {
  async show () {
    await app.mvc.loadView('search')
    this.listener()
  }

  listener () {
    document.getElementById('formSubmit').addEventListener('click', event => {
      event.preventDefault()
      this.search({
        text: document.getElementById('searchText').value,
        year: document.getElementById('searchDate').value,
        order: document.getElementById('searchOrder').value,
        page: document.getElementById('searchPage').value
      })
    })
  }

  search (params = {}) {
    const api = new ParisEvents()
    const results = api.getAll(params.text, params.year, params.order, params.page)
    app.dom.renderResults(results)
  }
}
