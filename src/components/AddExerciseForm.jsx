import React from 'react';

const AddExerciseForm = React.createClass({
    propTypes: {
        handleSubmit: React.PropTypes.func.isRequired,
        handleCancel: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            name: '',
            instructions: [ '' ],
            tips: [ '' ],
            isRepetitive: false,
            isWeightTraining: false,
            saving: false
        };
    },
    componentDidMount: function () {
        this.refs['name'].focus();
    },
    onKeyPress: function (e) {
        if (e.which === 13) {
            e.preventDefault();

            switch (e.target.name) {
                case 'instructions':
                    this.setState({ instructions: [ ...this.state.instructions, '' ] });
                    break;
                case 'tips':
                    this.setState({ tips: [ ...this.state.tips, '' ] });
                    break;
            }

            return false;
        }
    },
    onNameChange: function (e) {
        this.setState({ name: e.target.value });
    },
    onCheckboxChange: function (e) {
        var state = { };

        state[e.target.name] = e.target.checked;

        this.setState(state);
    },
    onInputChange: function (e) {
        var state = { };

        state[e.target.name] = [ ...this.state[e.target.name].slice(0, -1), e.target.value ];

        this.setState(state);
    },
    onSubmit: function (e) {
        e.preventDefault();

        this.props.handleSubmit(
            this.state.name,
            this.state.instructions.filter(instruction => !!instruction),
            this.state.tips.filter(tip => !!tip),
            this.state.isRepetitive
        ).then(function () {
            this.setState(this.getInitialState());
            this.refs['name'].focus();
        }.bind(this));

        this.setState({ saving: true });
    },
    onCancel: function (e) {
        e.preventDefault();

        this.props.handleCancel();
    },
    render: function () {
        var list = (function (items) {
            var list = '';

            if (this.state[items].length > 1) {
                list = this.state[items].slice(0, -1).map(function (item, index) {
                    return <li key={`${items}_${index}`}>{item}</li>;
                });

                list = <ol className="list-unstyled">{list}</ol>;

                if (items === 'tips') {
                    list = <div><h5>Tips</h5>{list}</div>;
                }
            }

            return list;
        }).bind(this);

        return (
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="col-xs-12">
                        <input
                            type="text"
                            className="form-control input-lg"
                            disabled={this.state.saving ? true : false}
                            placeholder="Name of Exercise"
                            onKeyPress={this.onKeyPress}
                            onChange={this.onNameChange}
                            value={this.state.name}
                            ref="name"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12">
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    disabled={this.state.saving ? true : false}
                                    onChange={this.onCheckboxChange}
                                    checked={this.state.isRepetitive}
                                    name="isRepetitive"
                                ></input> Performance measured in reps
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    disabled={this.state.saving ? true : false}
                                    onChange={this.onCheckboxChange}
                                    checked={this.state.isWeightTraining}
                                    name="isWeightTraining"
                                ></input> Performed using weights
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-6">
                        <h5>Instructions</h5>
                        {list('instructions')}                        
                        <input
                            type="text"
                            className="form-control"
                            disabled={this.state.saving ? true : false}
                            placeholder={ 'Step ' + this.state.instructions.length }
                            onKeyPress={this.onKeyPress}
                            onChange={this.onInputChange}
                            value={this.state.instructions.slice(-1)[0]}
                            name="instructions"
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        {list('tips')}                        
                        <input
                            type="text"
                            className="form-control"
                            disabled={this.state.saving ? true : false}
                            placeholder="Tip for doing the exercise properly"
                            onKeyPress={this.onKeyPress}
                            onChange={this.onInputChange}
                            value={this.state.tips.slice(-1)[0]}
                            name="tips"
                        />
                    </div>
                </div>
                <ul className="list-inline text-right">
                    <li>
                        <button
                            className="btn btn-default"
                            onClick={this.onCancel}
                            disabled={this.state.saving ? true : false}
                        >Cancel</button>
                    </li>
                    <li>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={this.state.saving ? true : !this.state.name ? true : false }
                        >
                            { this.state.saving ? 'Saving...' : 'Add Exercise' }
                        </button>
                    </li>
                </ul>
            </form> 
        );
    }
});

export default AddExerciseForm;
