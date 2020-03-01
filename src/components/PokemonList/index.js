import React, { useEffect, useState } from 'react'

import GenericPage from "../GenericPage";
import { read } from '../../services/pokemon'

const PokemonList = () => {

    const [pokemons, setPokemons] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const colsNumber = 9
    const rowsNumber = 3

    useEffect(() => {
        read((pageNumber - 1) * colsNumber * rowsNumber, colsNumber * rowsNumber).then(res => {
            setPokemons(res)
        })
    }, [pageNumber])

    const nextPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const prevPage = () => {
        setPageNumber(pageNumber - 1)
    }

    return (
        <GenericPage content={pokemons}
            colsNumber={colsNumber}
            cellHeight={130}
            prevPage={prevPage}
            currentPage={pageNumber}
            nextPage={nextPage}
            maxPage={36}
            />
    )
}

export default PokemonList