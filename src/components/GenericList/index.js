import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

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
    image: {
        height: 'fit-content',
        width: 'fit-content',
    },
    imgWrapping: {
        height: '-webkit-fill-available',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        textTransform: 'capitalize',
        textAlign: 'center',
    },
}))

const GenericList = (props) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [id, setId] = useState(1)

    const handleClickOpen = id => {
        console.log(id)
        setId(id)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cellHeight={props.cellHeight} spacing={2} cols={props.colsNumber}>
                {props.content.map(item => (
                    <GridListTile className={classes.card} key={item.id} onClick={() => handleClickOpen(item.id)}>
                        <div style={{ backgroundColor: item.color }} className={classes.imgWrapping}>
                            <img className={classes.image} alt={item.name} src={item.image} />
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