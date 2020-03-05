import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { Link } from "react-router-dom";

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
  tabs: {
    backgroundColor: '#1976d2'
  }
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
      <AppBar className={classes.header} position="static">
        <div style={{ width: 'fit-content' }}>
          <Tabs className={classes.tabs} value={value} onChange={handleChange}>
            <Tab label="Pokemon" {...a11yProps(0)} component={Link} to={'/'} />
            <Tab label="Item" {...a11yProps(1)} component={Link} to={'/berries'} />
          </Tabs>
        </div>
        <InputSearch />
      </AppBar>
  )
}
