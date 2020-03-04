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

const read = async (offset, limit) => {
    const res = await api.get(`item?offset=${offset}&limit=${limit}`)
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

export {
    read,
    detailedReading
}