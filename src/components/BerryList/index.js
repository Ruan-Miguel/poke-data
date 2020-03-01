import React, { useState, useEffect } from 'react'

import GenericPage from "../GenericPage";
import { read } from '../../services/berry'

const BerrieList = () => {
    const [berries, setBerries] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const colsNumber = 10
    const rowsNumber = 3

    useEffect(() => {
        read((pageNumber - 1) * colsNumber * rowsNumber, colsNumber * rowsNumber).then(res => {
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
        <GenericPage content={berries}
            colsNumber={colsNumber}
            cellHeight={130}
            prevPage={prevPage}
            currentPage={pageNumber}
            nextPage={nextPage}
            maxPage={3}
            />
    )
}

export default BerrieList