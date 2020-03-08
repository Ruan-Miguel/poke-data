import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import GenericPage from "../GenericPage"
import PokemonInfo from "../PokemonInfo";

import { getPokemons } from '../../services/pokemon'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const PokemonList = () => {

    const [pokemons, setPokemons] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const colsNumber = 7
    const rowsNumber = 3

    const pokemonName = useQuery().get('name')

    const cont = useRef(0)

    useEffect(() => {
        const fill = async () => {
            cont.current++
            const id = cont.current

            const elementsNumber = colsNumber * rowsNumber
            
            const aux = await getPokemons(pageNumber, elementsNumber, pokemonName)

            if (id === cont.current) {
                setPokemons(aux.pokemons)
                setMaxPage(aux.maxPage)
            }
        }

        fill()
    }, [pageNumber, pokemonName])

    const nextPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const prevPage = () => {
        setPageNumber(pageNumber - 1)
    }

    return (
        <GenericPage
            content={pokemons}
            action={PokemonInfo}
            colsNumber={colsNumber}
            cellHeight={130}
            prevPage={prevPage}
            currentPage={pageNumber}
            nextPage={nextPage}
            maxPage={maxPage}
            spacing={15}
        />
    )
}

export default PokemonList