import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

export default Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/pokemon" />
                <Route path="/berries" />
            </Switch>
        </BrowserRouter>
    )
}