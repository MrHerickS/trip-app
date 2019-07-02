import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Home from './routes/Home';
import Directions from './routes/Directions';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/directions" exact component={Directions} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
