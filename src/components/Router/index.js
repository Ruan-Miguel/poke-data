import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import MenuOrHeader from '../MenuOrHeader'
import PokemonList from '../PokemonList'
import ItemList from '../ItemList'

const Router = () => {
    return (
        <BrowserRouter>
            <Route path='/:tab'>
                <MenuOrHeader />
            </Route>
            <Switch>
                <Route exact path="/">
                    <Redirect
                        to={{ pathname: "/pokemons", }}
                    />
                </Route>
                <Route exact path="/pokemons">
                    <PokemonList />
                </Route>
                <Route exact path="/items">
                    <ItemList />
                </Route>
                <Route path='*'>
                    <p>eeeeeerr</p>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router