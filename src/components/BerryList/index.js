import React from 'react'

import GenericList from '../GenericList'
import { read } from '../../services/berry'

const BerrieList = () => {
    return (
        <GenericList  fill={read} colsNumber={10} cellHeight={120} />
    )
}

export default BerrieList