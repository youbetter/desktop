import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import './styles/bootstrap.css';
import PouchDB from 'pouchdb';

import WelcomeMessage from './components/WelcomeMessage.jsx';
import Journal from './components/Journal.jsx';
import Exercise from './components/Exercise.jsx';

// To use PouchDB-Fauxton Chrome Extension, window.PouchDB needs to be set
// TODO Can this be changed from window to global? Can this only be done when env === 'DEV'?
window.PouchDB = PouchDB;

var routes = [
    {
        action: 'journal',
        text: 'Journal',
        component: Journal
    },
    {
        action: 'exercise',
        text: 'Exercise',
        component: Exercise,
        props: [ 'config.exercise.remoteUrl' ]
    },
    {
        action: 'welcome',
        text: 'welcome',
        component: WelcomeMessage,
        index: true
    }
    
];
var config = {
    exercise: {
        remoteUrl: 'http://youbetter.smileupps.com'
    }
};

render(<App name="You Better" config={config} routes={routes}></App>, document.getElementById('root'));
