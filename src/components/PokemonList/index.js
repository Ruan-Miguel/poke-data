import React from 'react'

import GenericList from '../GenericList'
import { read } from '../../services/pokemon'

const PokemonList = () => {
    return (
        <GenericList  fill={read} />
    )
}

export default PokemonList