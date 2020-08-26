import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Dialog, DialogContent, DialogTitle, Slide } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Image from 'material-ui-image'

import { detailedReading } from '../../../../services/item'

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
  },
  imageWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3)
  }
}))

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ItemInfo = ({ id, open, handleClose }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const [details, setDetails] = useState({
    attributes: [],
    sprite: ''
  })

  useEffect(() => {
    if (id) {
      detailedReading(id).then(res => {
        setDetails(res)
      })
    } else {
      setDetails({
        attributes: [],
        sprite: ''
      })
    }
  }, [id])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth={'xs'}
      fullWidth
    >
      <DialogTitle className={classes.title} id="alert-dialog-title"><div>{details.name}</div></DialogTitle>
      <DialogContent id='alert-dialog-description'>
        <div className={classes.imageWrap}>
          <Image
            style={{ height: '30px', paddingTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            imageStyle={{ width: 'fit-content', height: 'fit-content', position: '' }}
            disableSpinner
            animationDuration={1000}
            alt={'Current Item'}
            src={details.sprite}
          />
        </div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Effect</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.description}>{details.effect}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Attributes</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.OrganizeColumns}>
            <Typography className={classes.column} component={'div'}>
              {details.attributes.map((attribute, index) => {
                return index % 2 === 0 && <Typography key={attribute}>{attribute}</Typography>
              })}
            </Typography>
            <Typography className={classes.column} component={'div'}>
              {details.attributes.map((attribute, index) => {
                return index % 2 !== 0 && <Typography key={attribute}>{attribute}</Typography>
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  )
}

ItemInfo.propTypes = {
  id: PropTypes.number,
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

export default ItemInfo
