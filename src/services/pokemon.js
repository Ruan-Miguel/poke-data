import axios from 'axios'
import api from './config/apiConfig'

const typesAndColors = [
    {
        name: 'normal',
        color: '#a8a878',
    },
    {
        name: 'fire',
        color: '#f08030',
    },
    {
        name: 'fighting',
        color: '#c03028',
    },
    {
        name: 'water',
        color: '#6890f0',
    },
    {
        name: 'flying',
        color: '#a890f0',
    },
    {
        name: 'grass',
        color: '#78c850',
    },
    {
        name: 'poison',
        color: '#a040a0',
    },
    {
        name: 'electric',
        color: '#f8d030',
    },
    {
        name: 'ground',
        color: '#e0c068',
    },
    {
        name: 'psychic',
        color: '#f85888',
    },
    {
        name: 'rock',
        color: '#b8a038',
    },
    {
        name: 'ice',
        color: '#98d8d8',
    },
    {
        name: 'bug',
        color: '#a8b820',
    },
    {
        name: 'dragon',
        color: '#7038f8',
    },
    {
        name: 'ghost',
        color: '#705898',
    },
    {
        name: 'dark',
        color: '#705848',
    },
    {
        name: 'steel',
        color: '#b8b8d0',
    },
    {
        name: 'fairy',
        color: '#ffaec9',
    },
]

const searchInfo = async (url) => {
    const res = await axios.get(url)
    const { data } = res
    const type = data.types[0].type.name
    const typeAndColor =  typesAndColors.find(item => {
        return item.name === type
    })
    const info = {
        name: data.name,
        image: data.sprites.front_default,
        color: typeAndColor.color,
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