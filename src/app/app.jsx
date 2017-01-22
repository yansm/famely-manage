import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { IndexRedirect, Router, IndexRoute, Route, hashHistory, browserHistory, Redirect } from 'react-router';
import 'antd/dist/antd.less';
import 'style/style.less';
//Helpers for debugging
window.React = React;


import { Provider } from 'react-redux';
import configure from './stores';

import Layout from 'components/Layout';
import MomentUser from 'components/MomentUser';


const store = configure();

injectTapEventPlugin();

ReactDOM.render( 
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="fame">
          <Route path="moment-user" component={MomentUser} />          
        </Route> 
      </Route>
    </Router>
  </Provider>

  , document.getElementById('app'));
