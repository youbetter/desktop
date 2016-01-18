import React, { Component } from 'react';
import WelcomeMessage from './WelcomeMessage.jsx';
import Journal from './Journal.jsx';
import ExerciseEditor from './ExerciseEditor.jsx';

const NavbarLink = React.createClass({
    render: function () {
        return (
            <li className="{this.props.isActive ? 'active' : ''}">
                <a href="#" onClick={this.props.clickHandler}>{this.props.children}</a>
            </li>
        );
    }
});

//TODO Include JS for Bootstrap Navbar
const App = React.createClass({
    getInitialState: function () {
        return { activeLink: 'welcome' };
    },
    render: function () {
        const app = this;
        const links = [
            { id: 'journal', name: 'Journal' },
            { id: 'exercises', name: 'Exercises' }
        ];
        var activeChild;

        function generateOnClick (linkId) {
            return function (e) {
                e.preventDefault();

                app.setState({ activeLink: linkId });
            };
        }

        switch (this.state.activeLink) {
            case 'journal':
                activeChild = <Journal></Journal>;
                break;
            case 'exercises':
                activeChild = <ExerciseEditor></ExerciseEditor>;
                break;
            case 'welcome':
            default:
                activeChild = <WelcomeMessage></WelcomeMessage>;
        }
       
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
                            <a href="#" onClick={generateOnClick('welcome')} className="navbar-brand">
                                <i>YOU BETTER</i>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-links">
                            <ul className="nav navbar-nav">
                                {
                                    links.map(function (link) {
                                        return (
                                            <NavbarLink
                                                key={link.id}
                                                clickHandler={generateOnClick(link.id)}
                                                isActive={app.state.activeLink === link.id}
                                            >{link.name}</NavbarLink>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                {activeChild}
            </div>
        );
    }
});

export default App;
