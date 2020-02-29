import React from 'react'

import GenericList from '../GenericList'
import { read } from '../../services/pokemonSpecies'

const PokemonList = () => {
    return (
        <GenericList  fill={read} />
    )
}

export default PokemonList