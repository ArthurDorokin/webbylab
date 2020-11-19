import React from 'react';
import {Switch, Route} from "react-router-dom";
import {Movies} from "./pages/Movies";
import {MovieInfo} from "./pages/MovieInfo";

function App() {
    return (
        <Switch>
            <Route exact path="/" component={Movies} />
            <Route path="/movie/" component={MovieInfo} />
        </Switch>
    );
}

export default App;
