const app = {
  // ----------------------------------------------------------------------------------------------------------------
  // MANIPULATION DU DOM DE L'APPLICATION
  // ----------------------------------------------------------------------------------------------------------------
  dom: {
    render: (html) => {
      document.querySelector('main.container').innerHTML = html
    },
    renderResults: async (results) => {
      const html = document.getElementById('results')
      html.innerHTML = ''

      const records = await results
      records.forEach(result => {
        const template = document.getElementById('blockResults')

        const clone = document.importNode(template.content, true)
        const titleElt = clone.querySelector('h3')
        const pElt = clone.querySelector('p')
        const imgElt = clone.querySelector('img')
        const linkElt = clone.querySelector('a')

        titleElt.textContent = result.title + ` (${result.category})`
        linkElt.setAttribute('href', result.image)
        imgElt.setAttribute('src', result.image)
        imgElt.setAttribute('alt', result.image_alt)
        pElt.innerHTML += result.description
        pElt.innerHTML += `Adresse : ${result.address}, à partir du ${result.date}`

        html.appendChild(clone)
        document.getElementById('linkUp').setAttribute('style', 'display:block')
      })
    },
    renderInElement: (element, name) => {
      element.textContent = `Bonjour ${name}`
      element.classList.add('nav-link')
    },
    on: (element, event, callback) => {
      document.getElementById(element).addEventListener(event, callback)
    }
  },

  // ----------------------------------------------------------------------------------------------------------------
  // ARCHITECTURE MVC DE L'APPLICATION
  // ----------------------------------------------------------------------------------------------------------------
  mvc: {
    router: null,
    loadView: async (view) => {
      return app.dom.render(await (await window.fetch(`../views/${view}.html`)).text())
    }
  }
}

export default app
