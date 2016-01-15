import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
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
const history = createHistory();

render(
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={WelcomeMessage} />
            <Route path="journal" component={Journal} />
            <Route path="exercise-editor" component={ExerciseEditor} />
        </Route>
    </Router>,
    document.getElementById('root')
);
