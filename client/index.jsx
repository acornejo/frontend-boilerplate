import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { combineReducers, applyMiddleware, createStore, bindActionCreators } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './components/App';
import About from './components/About';
import { actionCreators, actionReducers } from './actions';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const reducers = combineReducers({routing: routerReducer, todos: actionReducers});
const store = createStore(reducers, undefined,  window.devToolsExtension ? window.devToolsExtension() : undefined);
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={connectedApp} />
      <Route path="/about" component={About} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
