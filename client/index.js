import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { connect, Provider } from 'react-redux';
import { syncHistory, routeReducer } from 'react-router-redux';
import { combineReducers, applyMiddleware, createStore, bindActionCreators } from 'redux';
import reducers, { actions } from './reducers';
import App from './components/App';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

// create store, with routing + history mess
const reducer = combineReducers({routing: routeReducer, todos: reducers});
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware =
  applyMiddleware(reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={connectedApp} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
