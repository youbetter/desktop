import React from 'react';
import PouchDB from 'pouchdb';

const docs = new PouchDB('journal');
const Journal = React.createClass({
    getInitialState: function () {
        return { };
    },
    render: function () {
        return (
            <div className="container">
                <h2>Your Journal</h2>
            </div>
        );
    }
});

export default Journal;
