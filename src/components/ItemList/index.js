import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import GenericPage from "../GenericPage"
import ItemInfo from '../ItemInfo'

import { read, search as searchItem } from '../../services/item'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const BerrieList = () => {
    const [berries, setBerries] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const colsNumber = 10
    const rowsNumber = 3

    const itemName = useQuery().get('name')

    const cont = useRef(0)

    useEffect(() => {
        const getBerries = async () => {
            cont.current++
            const id = cont.current

            const elementsNumber = colsNumber * rowsNumber
            let aux

            if (itemName) {
                aux = await searchItem(pageNumber, elementsNumber, itemName)
            } else {
                aux = await read((pageNumber - 1) * elementsNumber, elementsNumber)
            }

            if (id === cont.current) {
                setBerries(aux)
            }
        }

        getBerries()
    }, [pageNumber, itemName])

    const nextPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const prevPage = () => {
        setPageNumber(pageNumber - 1)
    }

    return (
        <GenericPage
            content={berries}
            action={ItemInfo}
            colsNumber={colsNumber}
            cellHeight={130}
            prevPage={prevPage}
            currentPage={pageNumber}
            nextPage={nextPage}
            maxPage={32}
        />
    )
}

export default BerrieList