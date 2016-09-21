import React from 'react';
import PouchDB from 'pouchdb';

const docs = new PouchDB('activity');
const Activity = React.createClass({
    getInitialState: function () {
        return { };
    },
    render: function () {
        return (
            <div className="container">
                <h2>Your Activity</h2>
            </div>
        );
    }
});

export default Activity;
