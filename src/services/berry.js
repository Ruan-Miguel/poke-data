import axios from 'axios'
import api from './config/apiConfig'

const searchInfo = async (BerrieUrl) => {
    let res = await axios.get(BerrieUrl)
    const { data: berrieData } = res
    const itemUrl = berrieData.item.url

    res = await axios.get(itemUrl)
    const { data: itemData } = res
    const info = {
        name: itemData.name,
        image: itemData.sprites.default
    }

    return info
}

const read = async (offset, limit) => {
    const res = await api.get(`berry?offset=${offset}&limit=${limit}`)
    const berries = res.data.results
    const info = await Promise.all(berries.map(berry => searchInfo(berry.url)))

    return info
}

export {
    read
}