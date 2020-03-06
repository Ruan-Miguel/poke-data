import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core"
import Image from 'material-ui-image'

const useStyles = makeStyles(theme => ({
    root: {
        height: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100vw',
    },
    card: {
        cursor: 'pointer',
    },
    imgWrapping: {
        height: '100%',
    },
    name: {
        textTransform: 'capitalize',
        textAlign: 'center',
    },
}))

const GenericList = (props) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [id, setId] = useState()

    const handleClickOpen = id => {
        setId(id)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setId()
    }

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cellHeight={props.cellHeight} spacing={2} cols={props.colsNumber}>
                {props.content.map(item => (
                    <GridListTile className={classes.card} key={item.id} onClick={() => handleClickOpen(item.id)}>
                        <div className={classes.imgWrapping}>
                            <Image
                                style={{ backgroundColor: item.color, height: '100%', paddingTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                imageStyle={{ width: 'fit-content', height: 'fit-content', position: '', }}
                                disableSpinner
                                animationDuration={1000}
                                alt={item.name}
                                src={item.image}
                            />
                        </div>
                        <GridListTileBar
                            className={classes.name}
                            title={item.name}
                        />
                    </GridListTile>
                ))}
            </GridList>
            <props.action id={id} open={open} handleClose={handleClose} />
        </div>
    )
}

export default GenericList