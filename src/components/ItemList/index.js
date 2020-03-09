import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import GenericPage from "../GenericPage"
import ItemInfo from '../ItemInfo'

import { getBerries, numberOfPages } from '../../services/item'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const BerrieList = () => {
    const [berries, setBerries] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const colsNumber = 10
    const rowsNumber = 3

    const itemName = useQuery().get('name')

    const cont1 = useRef(0)
    const cont2 = useRef(0)

    useEffect(() => {
        const fill = async () => {
            cont1.current++
            const id = cont1.current

            const elementsNumber = colsNumber * rowsNumber
            
            let aux = await getBerries(pageNumber, elementsNumber, itemName)

            if (id === cont1.current) {
                setBerries(aux)
            }
        }

        fill()
    }, [pageNumber, itemName])

    useEffect(() => {
        const fill = async () => {
            cont2.current++
            const id = cont2.current

            const elementsNumber = colsNumber * rowsNumber

            const res = await numberOfPages(itemName, elementsNumber)

            if (id === cont2.current) {
                setMaxPage(res)
                setPageNumber(1)
            }
        }

        fill()
    }, [itemName])

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
            maxPage={maxPage}
        />
    )
}

export default BerrieList