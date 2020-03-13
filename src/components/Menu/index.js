import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Button, List, ListItem } from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
})

const Menu = () => {
    const classes = useStyles()
    const [state, setState] = React.useState({
        left: false,
    })

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button component={Link} to={`/pokemons`} key={'pokemon'}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={'Pokemon'} />
                </ListItem>
                <ListItem button component={Link} to={`/berries`} key={'berry'}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={'Berry'} />
                </ListItem>
            </List>
        </div>
    )

    return (
        <div>
            <Button onClick={toggleDrawer('left', true)}><MenuIcon /></Button>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    )
}

export default Menu