import axios from 'axios'
import api from './config/apiConfig'

//Listing
const searchInfo = async (itemUrl) => {
    let res = await axios.get(itemUrl)
    const { data: itemData } = res
    
    const info = {
        id: itemData.id,
        name: itemData.name,
        image: itemData.sprites.default
    }

    return info
}

const read = async (pageNumber, limit) => {
    const res = await api.get(`item?offset=${(pageNumber -1) * limit}&limit=${limit}`)
    const { results: items } = res.data
    const info = await Promise.all(items.map(item => searchInfo(item.url)))

    return info
}

//Specification
const detailedReading = async (id) => {
    const res = await api.get(`item/${id}`)
    const { data: item } = res
    const name = item.name
    const category = item.category.name
    const effect = item.effect_entries[0].effect
    const attributes = item.attributes.map(attribute => attribute.name)
    const sprite = item.sprites.default

    return {
        name,
        category,
        effect,
        attributes,
        sprite
    }
}

//Search

const specialFilter = (page, limit, items, name) => {
    const offset = limit * (page - 1)
    const res = []
    let offsetCont = 0

    for(let item of items) {
        if (item.name.includes(name)) {
            if (offsetCont < offset) {
                offsetCont++
            } else {
                if (res.length < limit) {
                    res.push(item)
                } else {
                    break
                }
            }
        }
    }

    return res
}

const search = async (pageNumber, limit, name) => {
    name = name.toLowerCase(name)

    const NumberOfItems = await api.get('/item').then(res => res.data.count)

    const items = await api.get(`item/?limit=${NumberOfItems}`).then(res => res.data.results)

    const selectedItems = specialFilter(pageNumber, limit, items, name)

    const info = await Promise.all(selectedItems.map(item => searchInfo(item.url)))

    return info
}

const getBerries = (pageNumber, limit, name) => {
    if (name && name !== '') {
        return search(pageNumber, limit, name)
    }

    return read(pageNumber, limit)
}

export {
    getBerries,
    detailedReading,
}