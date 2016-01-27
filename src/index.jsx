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
        props: [
            'config.COUCHDB_URL',
            'config.COUCHDB_TOKEN'
        ]
    },
    {
        action: 'welcome',
        text: 'welcome',
        component: WelcomeMessage,
        index: true
    }
    
];

let defaults = {
    COUCHDB_URL: '',
    COUCHDB_TOKEN: ''
};

const youBetter = function (el, options) {
    render(<App name="You Better" config={Object.assign(defaults, options)} routes={routes}></App>, el);
}

// Provide a main function on the window object.
window.youBetter = youBetter;

export default youBetter;
