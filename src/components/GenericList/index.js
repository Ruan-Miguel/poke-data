import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100vw',
        height: 450,
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

    const [content, changeContent] = useState([])

    useEffect(() => {
        props.fill(0, 14).then(response => {
            changeContent(response)
        })
    }, [props])

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cellHeight={props.cellHeight} spacing={10} cols={props.colsNumber}>
                {content.map(item => (
                    <GridListTile key={item.name}>
                        <div className={classes.imgWrapping}>
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