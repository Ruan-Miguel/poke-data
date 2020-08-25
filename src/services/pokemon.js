import axios from 'axios'
import api from './config/apiConfig'

const typesAndColors = [
  {
    name: 'normal',
    color: '#a8a878'
  },
  {
    name: 'fire',
    color: '#f08030'
  },
  {
    name: 'fighting',
    color: '#c03028'
  },
  {
    name: 'water',
    color: '#6890f0'
  },
  {
    name: 'flying',
    color: '#a890f0'
  },
  {
    name: 'grass',
    color: '#78c850'
  },
  {
    name: 'poison',
    color: '#a040a0'
  },
  {
    name: 'electric',
    color: '#f8d030'
  },
  {
    name: 'ground',
    color: '#e0c068'
  },
  {
    name: 'psychic',
    color: '#f85888'
  },
  {
    name: 'rock',
    color: '#b8a038'
  },
  {
    name: 'ice',
    color: '#98d8d8'
  },
  {
    name: 'bug',
    color: '#a8b820'
  },
  {
    name: 'dragon',
    color: '#7038f8'
  },
  {
    name: 'ghost',
    color: '#705898'
  },
  {
    name: 'dark',
    color: '#705848'
  },
  {
    name: 'steel',
    color: '#b8b8d0'
  },
  {
    name: 'fairy',
    color: '#ffaec9'
  }
]

// Listing

const searchInfo = async (url) => {
  const res = await axios.get(url)
  const { data } = res
  const type = data.types[0].type.name
  const typeAndColor = typesAndColors.find(item => {
    return item.name === type
  })

  return {
    id: data.id,
    name: data.name,
    image: (data.sprites.front_default) ? data.sprites.front_default : 'does not exist',
    color: typeAndColor.color
  }
}

const read = async (pageNumber, limit) => {
  const res = await api.get(`pokemon/?offset=${(pageNumber - 1) * limit}&limit=${limit}`)
  const pokemons = res.data.results
  const detailedPokemons = await Promise.all(pokemons.map(pokemon => searchInfo(pokemon.url)))

  return detailedPokemons
}

// Specification

const detailedPokemonSpecieReading = async (url) => {
  const res = await axios.get(url)
  const { data } = res
  const color = data.color.name
  const flavorText = data.flavor_text_entries.find(flavor => {
    return flavor.language.name === 'en'
  }).flavor_text

  return {
    color,
    flavorText
  }
}

const detailedPokemonReading = async (data) => {
  const name = data.name
  const abilities = data.abilities.map(item => item.ability.name)
  const images = {
    current: {
      front: data.sprites.front_default,
      back: data.sprites.back_default
    },
    shiny: {
      front: data.sprites.front_shiny,
      back: data.sprites.back_shiny
    }
  }

  const stats = data.stats.map(item => {
    return {
      name: item.stat.name,
      value: item.base_stat
    }
  })
  const types = data.types.map(item => item.type.name)

  return {
    name,
    abilities,
    stats,
    types,
    images
  }
}

const detailedReading = async (id) => {
  const res = await api.get(`pokemon/${id}`)

  return Promise.all([detailedPokemonReading(res.data), detailedPokemonSpecieReading(res.data.species.url)])
    .then(res => Object.assign(res[0], res[1]))
}

// Search

/**
 * filtering abstraction for the function "search"
 * @param {*} page
 * @param {*} limit
 * @param {*} pokemons
 * @param {*} name
 */
const filterByName = (page, limit, pokemons, name) => {
  const offset = limit * (page - 1)
  const res = []
  let offsetCont = 0

  for (const pokemon of pokemons) {
    if (pokemon.name.includes(name)) {
      if (offsetCont < offset) {
        offsetCont++
      } else {
        if (res.length < limit) {
          res.push(pokemon)
        } else {
          break
        }
      }
    }
  }

  return res
}

/**
 * performs a search for superficial details of items whose name contains the given string on a given page with a given number of elements
 * @param {*} pageNumber
 * @param {*} limit
 * @param {*} name
 */
const search = async (pageNumber, limit, name) => {
  name = name.toLowerCase()

  const NumberOfPokemons = await api.get('/pokemon').then(res => res.data.count)

  const pokemons = await api.get(`pokemon/?limit=${NumberOfPokemons}`).then(res => res.data.results)

  const selectedPokemons = filterByName(pageNumber, limit, pokemons, name)

  const detailedPokemons = await Promise.all(selectedPokemons.map(pokemon => searchInfo(pokemon.url)))

  return detailedPokemons
}

/**
 * Determine a list of pokemon based on a page, a number of pokemons per page and an optional search word
 * @param {*} pageNumber
 * @param {*} limit
 * @param {*} name
 */
const getPokemons = (pageNumber, limit, name) => {
  if (name && name !== '') {
    return search(pageNumber, limit, name)
  }
  return read(pageNumber, limit)
}

/**
 * Determine last page number
 * @param {*} name
 * @param {*} limit
 */
const numberOfPages = async (name, limit) => {
  const NumberOfPokemons = await api.get('/pokemon').then(res => res.data.count)

  if (name && name !== '') {
    name = name.toLowerCase()

    const pokemons = await api.get(`pokemon/?limit=${NumberOfPokemons}`).then(res => res.data.results)

    const numberOfMatches = pokemons.reduce((cont, pokemon) => {
      if (pokemon.name.includes(name)) {
        return cont + 1
      }
      return cont
    }, 0)

    return Math.ceil(numberOfMatches / limit)
  }

  return Math.ceil(NumberOfPokemons / limit)
}

export {
  detailedReading,
  getPokemons,
  numberOfPages
}
