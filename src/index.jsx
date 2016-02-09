import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import './styles/bootstrap.css';
import PouchDB from 'pouchdb';

import WelcomeMessage from './components/WelcomeMessage.jsx';
import Journal from './components/Journal.jsx';
import Exercise from './components/Exercise.jsx';

// To use the PouchDB-Fauxton Chrome Extension, window.PouchDB needs to be set
if (__DEV__) window.PouchDB = PouchDB;

const routes = [
    {
        action: 'journal',
        text: 'Journal',
        component: Journal
    },
    {
        action: 'exercise',
        text: 'Exercise',
        component: Exercise,
        props: [ 'db', 'userId' ]
    },
    {
        action: 'welcome',
        text: 'welcome',
        component: WelcomeMessage,
        index: true
    }
    
];

const youBetter = function (el, userId, remoteDb) {
    const db = new PouchDB('user_' + userId);

    db.sync(remoteDb, { live: true, retry: true });

    render(<App name="You Better" db={db} userId={userId} routes={routes}></App>, el);
}

// Provide a main function on the window object.
window.youBetter = youBetter;

export default youBetter;
