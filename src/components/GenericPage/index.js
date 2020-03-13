import React, { useEffect, useState, useRef } from 'react'
import { Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { useLocation, Link, } from 'react-router-dom'
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'

import GenericList from '../GenericList'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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

    const [content, setContent] = useState([])
    const cont1 = useRef(0)

    const [maxPage, setMaxPage] = useState(0)
    const cont2 = useRef(0)
    

    const base = useLocation().pathname

    let page = useQuery().get('page')
    page = page ? parseInt(page) : 1

    const name = useQuery().get('name')

    useEffect(() => {
        const fill = async () => {
            cont1.current++
            const id = cont1.current

            const res = await props.getContent(page, props.colsNumber * props.rowsNumber, name)

            if (id === cont1.current) {
                setContent(res)
            }
        }
        fill()
    }, [name, page, props])

    useEffect(() => {
        const fill = async () => {
            cont2.current++
            const id = cont2.current

            const res = await props.getMaxPage(name, props.colsNumber * props.rowsNumber)

            if (id === cont2.current) {
                setMaxPage(res)
            }
        }
        fill()
    }, [name, props])

    return (
        <div className={classes.root}>
            <GenericList action={props.action} content={content} currentPage={page} spacing={props.spacing} cellHeight={props.cellHeight} />
            <div className={classes.buttonWrapping}>
                <Button
                    component={Link}
                    to={`${base}?page=${parseInt(page) - 1}${(name) ? `&name=${name}` : ''}`}
                    disabled={parseInt(page) === 1}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<NavigateBeforeRoundedIcon />}
                >Prev</Button>
                <Button
                    component={Link}
                    to={`${base}?page=${parseInt(page) + 1}${(name) ? `&name=${name}` : ''}`}
                    disabled={parseInt(page) === maxPage}
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