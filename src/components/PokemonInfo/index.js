import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Divider } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import SwitchSprite from "../SwitchSprite";

import { detailedReading } from "../../services/pokemon"

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        /* height: '70%', */
        width: '25%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: theme.spacing(1),
    },
    description: {
        margin: theme.spacing(2),
    },
}))

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
        detailedReading(props.id).then(res => {
            setDetails(res)
            console.log(res)
        })
    }, [props.id])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} >
                <Typography className={classes.title} variant={'h5'} >{details.name}</Typography>
                <SwitchSprite images={details.images} />
                <Divider variant="middle" />
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Flavor Text</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.description} variant="subtitle1">{details.flavorText}</Typography>
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
                    <ExpansionPanelDetails>
                        <Typography component={'div'}>
                            {details.stats.map(stat => {
                                return <Typography key={stat.name + stat.value}>{`${stat.name}: ${stat.value}`}</Typography>
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
                    <ExpansionPanelDetails>
                        <Typography component={'div'}>
                            {details.abilities.map(ability => {
                                return <Typography key={ability}>{ability}</Typography>
                            })}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        </div>
    )
}

export default PokemonInfo