import React, { Component } from 'react';
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
    propTypes: {
        name: React.PropTypes.string.isRequired,
        routes: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                action: React.PropTypes.string.isRequired,
                text: React.PropTypes.string.isRequired,
                component: React.PropTypes.object.isRequired,
                index: React.PropTypes.boolean
            }).isRequired
        ).isRequired
    },
    getInitialState: function () {
        return { };
    },
    render: function () {
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
                            <a href="#" onClick={this.generateClickHandler('index')} className="navbar-brand">
                                <i style={{ textTransform: 'uppercase' }}>You Better</i>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-links">
                            <ul className="nav navbar-nav">
                                {this.props.routes.filter(route => !route.index).map(route => {
                                    return (
                                        <li
                                            key={route.action}
                                            className={this.state.action === route.action ? 'active' : ''}
                                        >
                                            <a href="#" onClick={this.generateClickHandler(route.action)}>
                                                {route.text}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.route()}
            </div>
        );
    },
    route: function () {
        let route = (
            this.props.routes.find(route => route.action === this.state.action) ||
            this.props.routes.find(route => route.index)
        );

        return route ? route.component : '';
    },
    generateClickHandler: function (action) {
        return function (e) {
            e.preventDefault();

            this.setState({ action: action });
        }.bind(this);
    }
});

export default App;
