import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { FormControlLabel, Switch } from '@material-ui/core'

import Image from 'material-ui-image'

const BlueSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: '#1976d2'
    },
    '&$checked + $track': {
      backgroundColor: '#1976d2'
    }
  },
  checked: {},
  track: {}
})(Switch)

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  imgWrap: {
    display: 'flex'
  }
}))

const imageStyles = {
  wraper: {
    height: '96px',
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: 'fit-content',
    height: 'fit-content',
    position: ''
  }
}

const SwitchSprite = ({ images }) => {
  const classes = useStyles()

  const [checked, setChecked] = useState(false)
  const [option, setOption] = useState({
    front: '',
    back: ''
  })

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    if (images) {
      if (checked) {
        setOption(images.shiny)
      } else {
        setOption(images.current)
      }
    } else {
      setOption(
        {
          front: '',
          back: null
        }
      )
    }
  }, [images, checked])

  return (
    <div className={classes.root}>
      <div className={classes.imgWrap}>
        <Image
          style={imageStyles.wraper}
          imageStyle={imageStyles.content}
          disableSpinner
          animationDuration={1000}
          alt={'front of current pokemon'}
          src={option.front}
        />
        {
          (option.back)
            ? <Image
              style={imageStyles.wraper}
              imageStyle={imageStyles.content}
              disableSpinner
              animationDuration={1000}
              alt={'back of current pokemon'}
              src={option.back}
            /> : ''
        }
      </div>
      <FormControlLabel
        control={
          <BlueSwitch
            checked={checked}
            onChange={handleChange}
            color="primary"
          />
        }
        label='Shiny'
        labelPlacement="bottom"
      />
    </div>
  )
}

SwitchSprite.propTypes = {
  images: PropTypes.object
}

export default SwitchSprite
