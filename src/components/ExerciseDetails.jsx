import React from 'react';

const ExerciseDetails = React.createClass({
    propTypes: {
        fetch: React.PropTypes.func.isRequired,
        link: React.PropTypes.shape({
            name: React.PropTypes.string,
            handleClick: React.PropTypes.func
        })
    },
    getInitialState: function () {
        return { loading: true };
    },
    componentDidMount: function () {
        this.fetchExercise(this.props.fetch);
    },
    componentWillReceiveProps: function (newProps) {
        this.fetchExercise(newProps.fetch);
    },
    render: function () {
        var component;

        if (this.state.loading) {
            component = <p>Loading...</p>
        } else {
            component = (
                <div>
                    <h2>{this.state.exercise._id}</h2>
                    <ul>
                        {this.state.exercise.instructions.map((instruction, index) => {
                            return <li key={index}>{instruction}</li>;
                        })}
                    </ul>
                    {
                        this.props.link ? 
                        <a href="#" onClick={this.props.link.handleClick}>{'< ' + this.props.link.text}</a> :
                        ''
                    }
                </div>
            );
        }

        return component;
    },
    fetchExercise: function (fetch) {
        this.replaceState({ loading: true });

        fetch().then(function (exercise) {
            this.setState({
                loading: false,
                exercise: exercise
            });
        }.bind(this));
    }
});

export default ExerciseDetails;
