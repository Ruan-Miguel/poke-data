import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import MenuIcon from '@material-ui/icons/Menu'

import InputSearch from '../InputSearch'

const useStyles = makeStyles({
  list: {
    width: 270
  },
  menu: {
    width: 'fit-content',
    position: 'fixed',
    zIndex: 1
  },
  inputWraper: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Menu = () => {
  const classes = useStyles()

  const [drawer, setDrawer] = useState(false)

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown') {
      if (event.key !== 'Enter') {
        return
      }

      if (event.key === 'Enter') {
        event.preventDefault()
      }
    }

    setDrawer(open)
  }

  return (
    <div>
      <Button className={classes.menu} onClick={toggleDrawer(true)}><MenuIcon /></Button>
      <Drawer open={drawer} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
        >
          <List>
            <ListItem onKeyDown={toggleDrawer(false)} className={classes.inputWraper}>
              <InputSearch />
            </ListItem>
            <ListItem button component={(useParams().tab !== 'pokemons') ? Link : 'div'} to={{ pathname: '/pokemons', search: null }} key={'pokemon'} onClick={toggleDrawer(false)}>
              <ListItemIcon><LinkIcon /></ListItemIcon>
              <ListItemText primary={'Pokemon'} />
            </ListItem>
            <ListItem button component={(useParams().tab !== 'items') ? Link : 'div'} to={{ pathname: '/items', search: null }} key={'berry'} onClick={toggleDrawer(false)}>
              <ListItemIcon><LinkIcon /></ListItemIcon>
              <ListItemText primary={'Berry'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default Menu
