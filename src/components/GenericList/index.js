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
            <GridList className={classes.gridList} spacing={10} cols={7}>
                {content.map(item => (
                    <GridListTile key={item.name}>
                        <img alt={item.name} src={item.image} />
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