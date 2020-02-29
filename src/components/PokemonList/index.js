import React from 'react'

import GenericList from '../GenericList'
import { read } from '../../services/pokemon'

const PokemonList = () => {
    return (
        <GenericList  fill={read} colsNumber={9} cellHeight={130} />
    )
}

export default PokemonList