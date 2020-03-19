import React, { useState, useRef, useLayoutEffect } from 'react'
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

  const name = useQuery().get('name')

  const [inputValue, setInputValue] = useState((name) ? name : '')

  const currentRoute = useParams().tab

  const didUpdate = useRef(false)

  useLayoutEffect(() => {
    if (didUpdate.current) {
      setInputValue('')
    } else {
      didUpdate.current = true
    }
  }, [currentRoute])

  return (
    <Paper component="div" className={classes.root}>
      <Redirect to={{
        pathname: `/${currentRoute}`,
        search: (inputValue !== '') ? `?name=${inputValue}` : '',
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