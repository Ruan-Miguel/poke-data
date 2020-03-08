import React, { useState } from 'react'
import { Redirect, useParams, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 30,
    width: 240,
    position: 'absolute',
    right: '1%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}))

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const InputSearch = () => {
  const classes = useStyles()

  const query = useQuery().get('name')

  const [inputValue, setInputValue] = useState((query) ? query : '')

  const currentRoute = useParams().tab

  return (
    <Paper component="div" className={classes.root}>
      <Redirect to={{
        pathname: `/${currentRoute}`,
        search: (inputValue === '') ? null : `?name=${inputValue}`,
      }}
      />
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )

}

export default InputSearch