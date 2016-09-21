import React from 'react';
import PouchDB from 'pouchdb';

const docs = new PouchDB('consumption');
const Consumption = React.createClass({
    getInitialState: function () {
        return { };
    },
    render: function () {
        return (
            <div className="container">
                <h2>Your Consumption</h2>
            </div>
        );
    }
});

export default Consumption;
