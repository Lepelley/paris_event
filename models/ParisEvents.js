import config from '../app/config.js'

export default class ParisEvents {
  async getAll (keyword = '', dateStart = new Date().getFullYear(), sortBy = '', page = 1) {
    const uri = `${config.openDataURL}&q=${encodeURIComponent(keyword)}&refine.date_start=${dateStart}&sort=${sortBy}&start=${page * config.perPage}`

    const results = (await (await fetch(uri)).json()).records
    return results.map(element => {
      return {
        title: element.fields.title,
        category: element.fields.category,
        address: element.fields.address_street,
        description: element.fields.description,
        image: element.fields.cover_url,
        image_alt: element.fields.cover_alt,
        date: (new Date(element.fields.date_start)).toLocaleString('fr-FR')
      }
    })
  }
}
