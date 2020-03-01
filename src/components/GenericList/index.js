import React from 'react'
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
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
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
    }
}))

const GenericList = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cellHeight={props.cellHeight} spacing={2} cols={props.colsNumber}>
                {props.content.map(item => (
                    <GridListTile key={item.name}>
                        <div style={{backgroundColor: item.color}} className={classes.imgWrapping}>
                        <img className={classes.image} alt={item.name} src={item.image} />
                        </div>
                        <GridListTileBar
                            title={item.name}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default GenericList