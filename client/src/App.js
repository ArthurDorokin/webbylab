import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import Movies from "./component/pages/Movies";
import MovieInfo from "./component/pages/MovieInfo";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Movies}/>
                <Route path="/movie/:id" component={MovieInfo}/>
            </Switch>
        );
    }
}

export default App;
