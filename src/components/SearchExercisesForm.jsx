import React from 'react';

const SearchExercisesForm = React.createClass({
    getInitialState: function () {
        return {
            query: ''
        };
    },
    onChange: function (e) {
        this.setState({ query: e.target.value });
    },
    onSubmit: function (e) {
        e.preventDefault();

        this.props.handleSearch(this.state.query);

        this.setState({ query: '' });
    },
    render: function () {
        return (
            <form className="form-inline" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.query}
                        placeholder="Exercise Title"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-default"
                    disabled={this.state.query ? false : true}
                >Search</button>
            </form> 
        );
    }
});

export default SearchExercisesForm;
