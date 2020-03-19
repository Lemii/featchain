import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import { history } from './store';
import Home from './screens/Home';
import Http404 from './screens/Http404';
import { getPath } from './utils/router-paths';
import './App.scss';
import AuthorityNew from "./screens/AuthorityNew";

class App extends Component {
  render() {
    return (
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={getPath('home')} render={() => <Home />} />
            <Route exact path={getPath('authority')} render={() => <AuthorityNew />} />
            <Route render={() => <Http404/>} />
          </Switch>
        </ConnectedRouter>
    );
  }
}

export default App;
