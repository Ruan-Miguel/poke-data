import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { Link } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: '#1976d2'
  }
}));

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs className={classes.tabs} value={value} onChange={handleChange} centered>
          <Tab label="Pokemon" {...a11yProps(0)} component={Link} to={'/'}/>
          <Tab label="Berry" {...a11yProps(1)} component={Link} to={'/berries'}/>
        </Tabs>
      </AppBar>
    </div>
  )
}
