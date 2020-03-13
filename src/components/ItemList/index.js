import React from 'react'

import GenericPage from "../GenericPage"
import ItemInfo from '../ItemInfo'

import { getBerries, numberOfPages } from '../../services/item'

const BerrieList = () => {

    const colsNumber = 7
    const rowsNumber = 3

    return (
        <GenericPage
            action={ItemInfo}
            getContent={getBerries}
            getMaxPage={numberOfPages}
            colsNumber={colsNumber}
            rowsNumber={rowsNumber}
            cellHeight={130}
        />
    )
}

export default BerrieList