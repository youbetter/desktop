import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { syncReduxAndRouter, routeReducer as routing } from 'redux-simple-router';
import PouchMiddleware from 'pouch-redux-middleware';
import PouchDB from 'pouchdb';

// To use PouchDB-Fauxton Chrome Extension, window.PouchDB needs to be set
// TODO Can this be changed from window to global? Can this only be done when env === 'DEV'?
window.PouchDB = PouchDB;

import App from './components/App.jsx';
import WelcomeMessage from './components/WelcomeMessage.jsx';
import Journal from './components/Journal.jsx';
import ExerciseEditor from './components/ExerciseEditor.jsx';

import './styles/bootstrap.css';

const db = new PouchDB('you-better');
const reducer = combineReducers({ routing });
const history = createHistory();
const store = applyMiddleware(
    PouchMiddleware([
        {
            path: '/journal/entries',
            db,
            actions: {
              insert: doc => store.dispatch({type: 'INSERT_ENTRY', entry: doc}),
              update: doc => store.dispatch({type: 'UPDATE_ENTRY', entry: doc})
            }
        },
        {
            path: '/workout/exercises',
            db,
            actions: {
                insert: doc => store.dispatch({type: 'INSERT_EXERCISE', exercise: doc}),
                update: doc => store.dispatch({type: 'UPDATE_EXERCISE', exercise: doc}),
                remove: doc => store.dispatch({type: 'DELETE_EXERCISE', exercise: doc})
            }
        }
    ])
)(createStore)(reducer);

console.log('type of db:', typeof db);

store.subscribe(() => {
    console.log('store state:', store.getState());
});

syncReduxAndRouter(history, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={WelcomeMessage} />
                <Route path="journal" component={Journal} />
                <Route path="exercise-editor" component={ExerciseEditor} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
