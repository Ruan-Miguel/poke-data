import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { read } from '../../services/pokemonSpecies'

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

export default function TitlebarGridList() {
    const classes = useStyles()

    const [pokemons, changePokemons] = useState([])

    useEffect(() => {
        read(0, 14).then(response => {
            changePokemons(response)
        })
    }, [])

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} spacing={10} cols={7}>
                {pokemons.map(pokemon => (
                    <GridListTile key={pokemon.name}>
                        <img alt={pokemon.name} src={pokemon.image} />
                        <GridListTileBar
                            title={pokemon.name}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}