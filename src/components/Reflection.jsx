import React from 'react';
import PouchDB from 'pouchdb';

const docs = new PouchDB('reflection');
const Reflection = React.createClass({
    getInitialState: function () {
        return { };
    },
    render: function () {
        return (
            <div className="container">
                <h2>Your Reflections</h2>
            </div>
        );
    }
});

export default Reflection;
