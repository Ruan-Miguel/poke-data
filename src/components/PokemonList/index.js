import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import GenericPage from "../GenericPage"
import PokemonInfo from "../PokemonInfo";

import { getPokemons, pagesNumber } from '../../services/pokemon'

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

    const cont1 = useRef(0)
    const cont2 = useRef(0)

    useEffect(() => {
        const fill = async () => {
            cont1.current++
            const id = cont1.current

            const elementsNumber = colsNumber * rowsNumber
            
            const pokemons = await getPokemons(pageNumber, elementsNumber, pokemonName)

            if (id === cont1.current) {
                setPokemons(pokemons)
            }
        }

        fill()
    }, [pageNumber, pokemonName])

    useEffect(() => {
        const fill = async () => {
            cont2.current++
            const id = cont2.current

            const elementsNumber = colsNumber * rowsNumber

            const res = await pagesNumber(pokemonName, elementsNumber)

            if (id === cont2.current) {
                setMaxPage(res)
                setPageNumber(1)
            }
        }

        fill()
    }, [pokemonName])

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