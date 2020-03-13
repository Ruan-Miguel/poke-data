import React from 'react'
import { useMediaQuery } from '@material-ui/core'

import Header from '../Header'
import Menu from '../Menu'

const MenuOrHeader = () => {
    const minWidth = useMediaQuery('(min-width:860px)')

    return (
        <div>
            {(minWidth) ? <Header /> : <Menu />}
        </div>
    )
}

export default MenuOrHeader