import React from 'react'

import { Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'

import GenericList from '../GenericList'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText('#1976d2'),
        backgroundColor: '#1976d2',
        '&:hover': {
            backgroundColor: '#115293',
        }
    },
    buttonWrapping: {
        display: 'flex',
        justifyContent: 'space-evenly',
    }
}))

const Pag = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <GenericList action={props.action} content={props.content} colsNumber={props.colsNumber} cellHeight={props.cellHeight} />
            <div className={classes.buttonWrapping}>
                <Button
                    disabled={props.currentPage === 1}
                    onClick={props.prevPage}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<NavigateBeforeRoundedIcon />}
                >Prev</Button>
                <Button
                disabled={props.currentPage === props.maxPage}
                    onClick={props.nextPage}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<NavigateNextRoundedIcon />}
                >Prox</Button>
            </div>
        </div>
    )
}

export default Pag