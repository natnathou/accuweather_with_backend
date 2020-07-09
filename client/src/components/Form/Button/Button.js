import React from 'react'
import {connect} from "react-redux"
import history from "../../../history/history"
import {formReset} from "../../../actions/actions"


export class Button extends React.Component {

// check which button we will render after that we map our json
    renderInput = json => json.map((data, index) => {
        switch (data.function) {

            case "send":
                return <button
                    type="submit"
                    className={data.color}
                    key={index}
                    onClick={this.handleSendClick}
                    >
                    {data.value}
                </button>;
            case "forgot-password":
                return <button
                    className={data.color}
                    key={index}
                    onClick={e=>history.push('forgot-password')}
                    >
                    {data.value}
                </button>;
            case "reset":
                return <button
                    className={data.color}
                    key={index}
                    onClick={this.handleResetClick}>
                    {data.value}
                </button>;

            default:
                return <button
                    className={data.color}
                    key={index}>
                    {data.value}
                </button>


        }

    });

    // we clcik on send we will send our form
    handleSendClick = (event) => {
        this.props.formSend(event)
    };

    // we clcik on send we will cancel our form
    handleResetClick = (event) => {
        event.preventDefault()
        this.props.formReset(this.props.formField, this.props.nameForm)
    };

    render() {
        return (
            <div className="Button">
                {this.renderInput(this.props.buttonField)}
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {

    return {
        formField  : ownProps.formField,
        buttonField: ownProps.buttonField,
        nameForm   : ownProps.nameForm,
        formSend   : ownProps.formSend
    }
};
export default connect(
    mapStateToProps, {formReset}
)(Button)
