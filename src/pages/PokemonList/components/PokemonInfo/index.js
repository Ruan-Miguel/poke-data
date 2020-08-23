import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import SwitchSprite from "../../../../components/SwitchSprite"

import { detailedReading } from "../../../../services/pokemon"

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
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const PokemonInfo = (props) => {
    const classes = useStyles()

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const [details, setDetails] = useState({
        stats: [],
        abilities: [],
    })

    useEffect(() => {
        if (props.id) {
            detailedReading(props.id).then(res => {
                setDetails(res)
            })
        } else {
            setDetails({
                stats: [],
                abilities: [],
            })
        }
    }, [props.id])

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            maxWidth={'sm'}
            fullWidth
        >
            <DialogTitle className={classes.title} id="alert-dialog-title"><div>{details.name}</div></DialogTitle>
            <DialogContent>
                <SwitchSprite images={details.images} />
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Flavor Text</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.description}>{details.flavorText}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Stats</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.OrganizeColumns}>
                        <Typography className={classes.column} component={'div'}>
                            {details.stats.map((stat, index) => {
                                return (index % 2 === 0) ? <Typography key={stat.name + stat.value}>{`${stat.name}: ${stat.value}`}</Typography> : null
                            })}
                        </Typography>
                        <Typography className={classes.column} component={'div'}>
                            {details.stats.map((stat, index) => {
                                return (index % 2 !== 0) ? <Typography key={stat.name + stat.value}>{`${stat.name}: ${stat.value}`}</Typography> : null
                            })}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>Abilities</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.OrganizeColumns}>
                        <Typography className={classes.column} component={'div'}>
                            {details.abilities.map((ability, index) => {
                                return (index % 2 === 0) ? <Typography key={ability}>{ability}</Typography> : null
                            })}
                        </Typography>
                        <Typography className={classes.column} component={'div'}>
                            {details.abilities.map((ability, index) => {
                                return (index % 2 !== 0) ? <Typography key={ability}>{ability}</Typography> : null
                            })}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </DialogContent>
        </Dialog>
    )
}

export default PokemonInfo