import React from 'react';

const ExerciseDetails = React.createClass({
    propTypes: {
        queryId: React.PropTypes.string.isRequired,
        fetch: React.PropTypes.func.isRequired,
        viewAllExercises: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return { loading: true };
    },
    componentDidMount: function () {
        this.props.fetch(this.props.queryId).then(function (exercise) {
            this.setState({
                loading: false,
                exercise: exercise
            });
        }.bind(this));
    },
    render: function () {
        var component;
        var instructions;

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
                    <a href="#" onClick={this.props.viewAllExercises}>&lt; Your Exercises</a>
                </div>
            );
        }

        return component;
    }
});

export default ExerciseDetails;
