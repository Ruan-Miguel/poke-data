import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Header from '../Header'
import PokemonList from '../PokemonList'

const Router = () => {
    return (
        <BrowserRouter>
            <Route path='/'>
                <Header />
            </Route>
            <Switch>
                <Route exact path="/">
                    <PokemonList />
                </Route>
                <Route path="/berries">
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router