import React, { Component } from 'react';
import WelcomeMessage from './WelcomeMessage.jsx';
import Journal from './Journal.jsx';
import Exercise from './Exercise.jsx';

const NavbarLink = React.createClass({
    render: function () {
        return (
            <li className={this.props.isActive ? 'active' : ''}>
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
    generateOnClick: function (linkId) {
        var app = this;

        return function (e) {
            e.preventDefault();

            app.setState({ activeLink: linkId });
        };
    },
    render: function () {
        const links = [
            { id: 'journal', name: 'Journal' },
            { id: 'exercise', name: 'Exercise' }
        ];
        var activeChild;


        switch (this.state.activeLink) {
            case 'journal':
                activeChild = <Journal></Journal>;
                break;
            case 'exercise':
                activeChild = <Exercise></Exercise>;
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
                            <a href="#" onClick={this.generateOnClick('welcome')} className="navbar-brand">
                                <i style={{ textTransform: 'uppercase' }}>You Better</i>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-links">
                            <ul className="nav navbar-nav">
                                {
                                    links.map((link) => {
                                        return (
                                            <NavbarLink
                                                key={link.id}
                                                clickHandler={this.generateOnClick(link.id)}
                                                isActive={this.state.activeLink === link.id}
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
