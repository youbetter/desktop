import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import './styles/bootstrap.css';
import PouchDB from 'pouchdb';

import WelcomeMessage from './components/WelcomeMessage.jsx';
import Activity from './components/Activity.jsx';
import Reflection from './components/Reflection.jsx';
import Exertion from './components/Exertion.jsx';
import Consumption from './components/Consumption.jsx';

// To use the PouchDB-Fauxton Chrome Extension, window.PouchDB needs to be set
if (__DEV__) window.PouchDB = PouchDB;

const routes = [
    {
        action: 'welcome',
        text: 'welcome',
        component: WelcomeMessage,
        index: true
    },
    {
        action: 'activity',
        text: 'Activity',
        component: Activity
    },
    {
        action: 'consumption',
        text: 'Consumption',
        component: Consumption
    },
    {
        action: 'exertion',
        text: 'Exertion',
        component: Exertion,
        props: [ 'db', 'userId' ]
    },
    {
        action: 'reflection',
        text: 'Reflection',
        component: Reflection
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
