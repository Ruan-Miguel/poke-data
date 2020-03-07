import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import Header from '../Header'
import PokemonList from '../PokemonList'
import ItemList from '../ItemList'

const Router = () => {
    return (
        <BrowserRouter>
            <Route path='/:tab'>
                <Header />
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
                <Route exact path="/berries">
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