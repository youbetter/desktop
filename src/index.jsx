import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import './styles/bootstrap.css';
import PouchDB from 'pouchdb';

// To use PouchDB-Fauxton Chrome Extension, window.PouchDB needs to be set
// TODO Can this be changed from window to global? Can this only be done when env === 'DEV'?
window.PouchDB = PouchDB;

render(<App></App>, document.getElementById('root'));
