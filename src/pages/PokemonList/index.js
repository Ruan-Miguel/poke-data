import React from 'react'

import GenericPage from '../../components/GenericPage'
import PokemonInfo from './components/PokemonInfo'

import { getPokemons, numberOfPages } from '../../services/pokemon'

const PokemonList = () => {
  const colsNumber = 7
  const rowsNumber = 3

  return (
    <GenericPage
      Action={PokemonInfo}
      getContent={getPokemons}
      getMaxPage={numberOfPages}
      colsNumber={colsNumber}
      rowsNumber={rowsNumber}
      spacing={15}
      cellHeight={130}
    />
  )
}

export default PokemonList
