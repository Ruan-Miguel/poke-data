import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { detailedReading } from "../../services/item"

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    description: {
        textAlign: 'justify',
    },
    OrganizeColumns: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    column: {
        width: '45%',
        textAlignLast: 'justify',
    },
    imageWrap: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const ItemInfo = (props) => {
    const classes = useStyles()

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const [details, setDetails] = useState({
        attributes: []
    })

    useEffect(() => {
        if (props.id) {
            detailedReading(props.id).then(res => {
                console.log(res)
                setDetails(res)
            })
        } else {
            setDetails({
                attributes: []
            })
        }
    }, [props.id])

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            maxWidth={'xs'}
            fullWidth
        >
            <DialogTitle className={classes.title} id="alert-dialog-title"><div>{details.name}</div></DialogTitle>
            <DialogContent id='alert-dialog-description'>
                <div className={classes.imageWrap}><img alt='Current Item' src={details.sprite}></img></div>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Effect</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.description}>{details.effect}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Attributes</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.OrganizeColumns}>
                        <Typography className={classes.column} component={'div'}>
                            {details.attributes.map((attribute, index) => {
                                return (index % 2 === 0) ? <Typography key={attribute}>{attribute}</Typography> : null
                            })}
                        </Typography>
                        <Typography className={classes.column} component={'div'}>
                            {details.attributes.map((attribute, index) => {
                                return (index % 2 !== 0) ? <Typography key={attribute}>{attribute}</Typography> : null
                            })}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </DialogContent>
        </Dialog>
    )
}

export default ItemInfo