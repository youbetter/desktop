import React, { Component } from 'react';
import WelcomeMessage from './WelcomeMessage.jsx';
import Journal from './Journal.jsx';
import Exercise from './Exercise.jsx';
//TODO Include JS for Bootstrap Navbar

const NavbarLink = React.createClass({
    render: function () {
        return (
            <li className={this.props.isActive ? 'active' : ''}>
                <a href="#" onClick={this.props.clickHandler}>{this.props.children}</a>
            </li>
        );
    }
});

const App = React.createClass({
    getInitialState: function () {
        return { route: { action: 'welcome' } };
    },
    render: function () {
        const links = [
            { action: 'journal', text: 'Journal' },
            { action: 'exercise', text: 'Exercise' }
        ];
       
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
                            <a href="#" onClick={this.generateClickHandler('welcome')} className="navbar-brand">
                                <i style={{ textTransform: 'uppercase' }}>You Better</i>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-links">
                            <ul className="nav navbar-nav">
                                {
                                    links.map((link) => {
                                        return (
                                            <NavbarLink
                                                key={link.action}
                                                isActive={this.state.route.action === link.action}
                                                clickHandler={this.generateClickHandler(link.action)}
                                            >{link.text}</NavbarLink>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.route()}
            </div>
        );
    },
    route: function () {
        switch (this.state.route.action) {
            case 'journal':
                return <Journal></Journal>;
            case 'exercise':
                return <Exercise></Exercise>;
            case 'welcome':
            default:
                return <WelcomeMessage></WelcomeMessage>;
        }
    },
    generateClickHandler: function (action) {
        return function (e) {
            e.preventDefault();

            this.setState({ route: { action: action } });
        }.bind(this);
    }
});

export default App;
