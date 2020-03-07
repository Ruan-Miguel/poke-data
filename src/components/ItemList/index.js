import React, { useState, useEffect } from 'react'

import GenericPage from "../GenericPage"
import ItemInfo from '../ItemInfo'

import { read } from '../../services/item'

const BerrieList = () => {
    const [berries, setBerries] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const colsNumber = 10
    const rowsNumber = 3

    useEffect(() => {
        const elementsNumber = colsNumber * rowsNumber
        
        read((pageNumber - 1) * elementsNumber, elementsNumber).then(res => {
            setBerries(res)
        })
    }, [pageNumber])

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