import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import GenericPage from "../GenericPage"
import PokemonInfo from "../PokemonInfo";

import { read, search as pokemonSearch } from '../../services/pokemon'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PokemonList = () => {

    const [pokemons, setPokemons] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const colsNumber = 7
    const rowsNumber = 3

    const pokemonName = useQuery().get('name')

    const cont = useRef(0)

    useEffect(() => {
        const getPokemons = async () => {
            cont.current++
            const id = cont.current

            const elementsNumber = colsNumber * rowsNumber
            let aux

            if (pokemonName) {
                aux = await pokemonSearch(pageNumber, elementsNumber, pokemonName)
            } else {
                aux = await read(pageNumber, elementsNumber)
            }

            if (id === cont.current) {
                setPokemons(aux)
            }
        }

        getPokemons()
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
            maxPage={36}
            spacing={15}
        />
    )
}

export default PokemonList