import React from 'react';
import PouchDB from 'pouchdb';
import SearchExercisesForm from './SearchExercisesForm.jsx';
import AddExerciseForm from './AddExerciseForm.jsx';
import ExerciseList from './ExerciseList.jsx';
import ExerciseDetails from './ExerciseDetails.jsx';

const Exercise = React.createClass({
    propTypes: {
        db: React.PropTypes.instanceOf(PouchDB).isRequired,
        userId: React.PropTypes.string.isRequired,
        initialAction: React.PropTypes.oneOf([ 'list-exercises', 'add-exercise' ]),
        initialQuery: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            route: {
                action: this.props.initialAction || 'list-exercises',
                query: this.props.initialQuery
            }
        };
    },
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 visible-xs-block">
                        <h4>Exercise</h4>
                    </div>
                    <div className="col-xs-12 col-md-6 col-md-push-6 text-right">
                        <SearchExercisesForm handleSearch={this.showSearchResults}></SearchExercisesForm>
                    </div>
                    {
                        this.state.route.action !== 'add-exercise' ?
                        (
                            <div className="col-xs-12 col-md-6 col-md-pull-6">
                                <button
                                    className="btn btn-default"
                                    onClick={this.showAddExerciseForm}
                                >Add an Exercise</button>
                            </div>
                        ) :
                        ''
                    }
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        {this.route()}
                    </div>
                </div>
            </div>
        );
    },
    route: function () {
        switch (this.state.route.action) {
            case 'view-exercise':
                return (
                    <ExerciseDetails
                        fetch={this.viewExercise.bind(this, this.state.route.query.id)}
                        link={{ text: 'Your Exercises', handleClick: this.showExerciseList }}
                    ></ExerciseDetails>
                );
            case 'add-exercise':
                return (
                    <AddExerciseForm
                        handleSubmit={this.addExercise}
                        handleCancel={this.showExerciseList}
                    ></AddExerciseForm>
                );
            case 'list-search-results':
                return (
                    <ExerciseList
                        title="Search Results"
                        fetch={this.searchExercises.bind(this, this.state.route.query.term)}
                        showDetails={this.showExerciseDetails}
                        link={{ text: 'Your Exercises', handleClick: this.showExerciseList }}
                    ></ExerciseList>
                );
            case 'list-exercises':
            default:
                return (
                    <ExerciseList
                        title="Your Exercises"
                        fetch={this.listExercises}
                        showDetails={this.showExerciseDetails}
                    ></ExerciseList>
                );
        }
    },
    addExercise: function (name, instructions, isRepetitive, isWeightTraining) {
        return this.props.db.put({
            _id: `exercise:${name}:by:${this.props.userId}`,
            type: 'exercise',
            name: name,
            instructions: instructions,
            isRepetitive: isRepetitive,
            isWeightTraining: isWeightTraining,
            createdBy: this.props.userId
        });
    },
    viewExercise: function (id) {
        return this.props.db.get(id);
    },
    listExercises: function (skip, limit) {
        return this.props.db.allDocs({
            include_docs: true,
            startkey: 'exercise:',
            endkey: 'exercise:\ufff0'
        });
    },
    searchExercises: function (term, skip, limit) {
        return this.props.db.allDocs({
            include_docs: true,
            startkey: `exercise:${term}`,
            endkey: `exercise:${term}\uffff`
        });
    },
    showAddExerciseForm: function () {
        this.setState({ route: { action: 'add-exercise' } });
    },
    showSearchResults: function (term) {
        this.setState({
            route: {
                action: 'list-search-results',
                query: { term: term }
            }
        });
    },
    showExerciseList: function () {
        this.setState({ route: { action: 'list-exercises' } });
    },
    showExerciseDetails: function (id) {
        this.setState({ 
            route: { 
                action: 'view-exercise',
                query: { id: id }
            }
        });
    }
});

export default Exercise;
