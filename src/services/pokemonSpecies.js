import axios from 'axios'
import api from './config/apiConfig'

const searchInfo = async (url) => {
    const res = await axios.get(url)
    const data = res.data
    const info = {
        name: data.name,
        image: data.sprites.front_default
    }

    return info
}

const read = async (offset, limit) => {
    const res = await api.get(`pokemon/?offset=${offset}&limit=${limit}`)
    const pokemons = res.data.results
    const info = await Promise.all(pokemons.map(pokemon => searchInfo(pokemon.url)))

    return info
}

export {
    read
}