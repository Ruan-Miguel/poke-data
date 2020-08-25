import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Dialog, DialogContent, DialogTitle, Slide } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import SwitchSprite from '../../../../components/SwitchSprite'

import { detailedReading } from '../../../../services/pokemon'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  title: {
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  description: {
    textAlign: 'justify'
  },
  OrganizeColumns: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  column: {
    width: '45%',
    textAlignLast: 'justify'
  }
}))

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PokemonInfo = ({ id, open, handleClose }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = useState(false)

  const [details, setDetails] = useState({
    stats: [],
    abilities: []
  })

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    if (id) {
      detailedReading(id).then(res => {
        setDetails(res)
      })
    } else {
      setDetails({
        stats: [],
        abilities: []
      })
    }
  }, [id])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle className={classes.title} id="alert-dialog-title"><div>{details.name}</div></DialogTitle>
      <DialogContent>
        <SwitchSprite images={details.images} />
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Flavor Text</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.description}>{details.flavorText}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Stats</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.OrganizeColumns}>
            <Typography className={classes.column} component={'div'}>
              {details.stats.map((stat, index) => {
                return index % 2 === 0 && <Typography key={stat.name + stat.value}>{`${stat.name}: ${stat.value}`}</Typography>
              })}
            </Typography>
            <Typography className={classes.column} component={'div'}>
              {details.stats.map((stat, index) => {
                return index % 2 !== 0 && <Typography key={stat.name + stat.value}>{`${stat.name}: ${stat.value}`}</Typography>
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Abilities</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.OrganizeColumns}>
            <Typography className={classes.column} component={'div'}>
              {details.abilities.map((ability, index) => {
                return index % 2 === 0 && <Typography key={ability}>{ability}</Typography>
              })}
            </Typography>
            <Typography className={classes.column} component={'div'}>
              {details.abilities.map((ability, index) => {
                return index % 2 !== 0 && <Typography key={ability}>{ability}</Typography>
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  )
}

PokemonInfo.propTypes = {
  id: PropTypes.number,
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

export default PokemonInfo
