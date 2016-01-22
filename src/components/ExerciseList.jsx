import React from 'react';

const ExerciseList = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        fetch: React.PropTypes.func.isRequired,
        showDetails: React.PropTypes.func.isRequired,
        prevPage: React.PropTypes.func,
        nextPage: React.PropTypes.func,
        viewAllExercises: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            loading: true
        }
    },
    componentDidMount: function () {
        this.fetchExercises(this.props.fetch);
    },
    componentWillReceiveProps: function (newProps) {
        this.fetchExercises(newProps.fetch);
    },
    render: function () {
        var state;
        var exercises;

        if (this.state.loading) {
            state = <p>Loading...</p>;
        } else {
            if (this.state.exercises && this.state.exercises.length) {
                exercises = this.state.exercises.map(function (exercise, index) {
                    var onClick = function (e) {
                        e.preventDefault();

                        this.props.showDetails(exercise);
                    }.bind(this);

                    return <li key={index}><a href="#" onClick={onClick}>{exercise}</a></li>;
                }.bind(this));

                state = <ul>{exercises}</ul>;
            } else {
                state = <p>There are no exercises to display</p>;
            }
        }

        return (
            <div>
                <h2>{this.props.title}</h2>
                {state}
                {
                    this.props.viewAllExercises ? 
                    <a href="#" onClick={this.props.viewAllExercises}>&lt; Your Exercises</a> :
                    ''
                }
            </div>
        );
    },
    fetchExercises: function (fetch) {
        fetch().then(function (result) {
            this.setState({
                loading: false,
                exercises: result.rows.map(row => row.id)
            });
        }.bind(this));
    }
});

export default ExerciseList;
