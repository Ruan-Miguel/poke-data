import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import MenuIcon from '@material-ui/icons/Menu'

import InputSearch from '../InputSearch'

const useStyles = makeStyles({
    list: {
        width: 270,
    },
    menu: {
        width: 'fit-content',
        position: 'fixed',
        zIndex: 1,
    },
    inputWraper: {
        display: 'flex',
        justifyContent: 'center',
    },
})

const Menu = () => {
    const classes = useStyles()
    const [state, setState] = React.useState({
        left: false,
    })

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown') {
            if (event.key !== 'Enter') {
                return
            }

            if (event.key === 'Enter') {
                event.preventDefault()
            }
        }

        setState({ ...state, [side]: open })
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
        >
            <List>
                <ListItem onKeyDown={toggleDrawer(side, false)} className={classes.inputWraper}>
                    <InputSearch />
                </ListItem>
                <ListItem button component={Link} to={{ pathname: '/pokemons', search: null }} key={'pokemon'} onClick={toggleDrawer(side, false)}>
                    <ListItemIcon><LinkIcon /></ListItemIcon>
                    <ListItemText primary={'Pokemon'} />
                </ListItem>
                <ListItem button component={Link} to={{ pathname: '/berries', search: null }} key={'berry'} onClick={toggleDrawer(side, false)}>
                    <ListItemIcon><LinkIcon /></ListItemIcon>
                    <ListItemText primary={'Berry'} />
                </ListItem>
            </List>
        </div>
    )

    return (
        <div>
            <Button className={classes.menu} onClick={toggleDrawer('left', true)}><MenuIcon /></Button>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    )
}

export default Menu