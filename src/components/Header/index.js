import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { useParams, Link, useLocation } from "react-router-dom";

import InputSearch from "../InputSearch";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976d2',
  },
  tabsWrap: {
    width: 'fit-content',
  },
  tabs: {
    backgroundColor: '#1976d2'
  }
}))

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Header = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState((useParams().tab === 'pokemons') ? 0 : 1)

  const query = useQuery().get('name')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
      <AppBar className={classes.header} position="static">
        <div className={classes.tabsWrap}>
          <Tabs className={classes.tabs} value={value} onChange={handleChange}>
            <Tab label="Pokemon" {...a11yProps(0)} component={Link} to={`/pokemons${(query) ? `?name=${query}` : ''}`} />
            <Tab label="Item" {...a11yProps(1)} component={Link} to={`/berries${(query) ? `?name=${query}` : ''}`} />
          </Tabs>
        </div>
        <InputSearch />
      </AppBar>
  )
}

export default Header