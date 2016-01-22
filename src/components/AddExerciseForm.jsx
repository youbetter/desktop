import React from 'react';

const AddExerciseForm = React.createClass({
    propTypes: {
        handleSubmit: React.PropTypes.func.isRequired,
        handleCancel: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            title: '',
            instructions: [ '' ],
            saving: false
        }
    },
    componentDidMount: function () {
        this.refs['title-input'].focus();
    },
    onInputKeyPress: function (e) {
        if (e.which === 13) {
            e.preventDefault();

            if (e.target === this.refs['instruction-input'] && e.target.value) {
                this.setState(
                    Object.assign(
                        { },
                        ...this.state,
                        { instructions: [ ...this.state.instructions, '' ] }
                    )
                );
            }

            return false;
        }
    },
    onTitleInput: function (e) {
        this.setState(Object.assign({ }, ...this.state, { title: e.target.value }));
    },
    onInstructionInputChange: function (e) {
        this.setState(
            Object.assign(
                { },
                ...this.state,
                { instructions: [ ...this.state.instructions.slice(0, -1), e.target.value ] }
            )
        );
    },
    onSubmit: function (e) {
        e.preventDefault();

        this.props.handleSubmit(
            this.state.title,
            this.state.instructions.filter(instruction => !!instruction)
        ).then(function () {
            this.setState(this.getInitialState());
            this.refs['title-input'].focus();
        }.bind(this));

        this.setState(
            Object.assign(
                { },
                ...this.state,
                { saving: true }
            )
        );
    },
    onCancel: function (e) {
        e.preventDefault();

        this.props.handleCancel();
    },
    render: function () {
        let previousSteps = '';
        var instructions;

        if (this.state.instructions.length > 1) {
            instructions = this.state.instructions.slice(0, -1).map(function (instruction, index) {
                return <li key={index}>{instruction}</li>;
            });

            previousSteps = <ol>{instructions}</ol>
        }

        return (
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="col-xs-12">
                        <input
                            type="text"
                            className="form-control input-lg"
                            disabled={this.state.saving ? true : false}
                            placeholder="Title"
                            onKeyPress={this.onInputKeyPress}
                            onChange={this.onTitleInput}
                            value={this.state.title}
                            ref="title-input"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12">
                        <h5>Instructions</h5>
                        {previousSteps}                        
                        <input
                            type="text"
                            className="form-control"
                            disabled={this.state.saving ? true : false}
                            placeholder={ 'Step ' + this.state.instructions.length }
                            onKeyPress={this.onInputKeyPress}
                            onChange={this.onInstructionInputChange}
                            value={this.state.instructions.slice(-1)[0]}
                            ref="instruction-input"
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
                            disabled={this.state.saving ? true : !this.state.title ? true : false }
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
