import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
    render () {
        return (
            <div id="app">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#navbar-links"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span> </button>
                            <Link to="/" className="navbar-brand"><i>YOU BETTER</i></Link>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-links">
                            <ul className="nav navbar-nav">
                                <li><Link to="/journal">Journal</Link></li>
                                <li><Link to="/exercise-editor">Exercises</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}
