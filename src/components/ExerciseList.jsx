import React from 'react';

const ExerciseList = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        fetch: React.PropTypes.func.isRequired,
        showDetails: React.PropTypes.func.isRequired,
        link: React.PropTypes.shape({
            text: React.PropTypes.string.isRequired,
            handleClick: React.PropTypes.func.isRequired
        })
    },
    getInitialState: function () {
        return { loading: true };
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

                        this.props.showDetails(exercise._id);
                    }.bind(this);

                    return <li key={exercise._id}><a href="#" onClick={onClick}>{exercise.name}</a></li>;
                }.bind(this));

                state = <ul>{exercises}</ul>;
            } else {
                state = <p>No exercises to display</p>;
            }
        }

        return (
            <div>
                <h2>{this.props.title}</h2>
                {state}
                {
                    this.props.link ? 
                    <a href="#" onClick={this.props.link.handleClick}>{'< ' + this.props.link.text}</a> :
                    ''
                }
            </div>
        );
    },
    fetchExercises: function (fetch) {
        this.replaceState({ loading: true });

        fetch().then(function (result) {
            this.setState({
                loading: false,
                exercises: result.rows.map(row => row.doc)
            });
        }.bind(this));
    }
});

export default ExerciseList;
