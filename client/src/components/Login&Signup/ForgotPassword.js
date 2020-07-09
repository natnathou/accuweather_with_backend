import React from 'react'
import {connect} from "react-redux"
import Form from "../Form/Form"
import buttonField from "../Form/json/buttonField"
import formField from "../Form/json/formField"
import {setResponseMessageError} from "../../actions/actions"

class ForgotPassword extends React.Component {
    componentDidMount() {
        this.props.setResponseMessageError("", `forgotPassword`)
    }

    renderLoader = () => {
        if (this.props.attemptingResponse) {
            return <div className="ui active inverted dimmer">
                <div className="ui text loader"></div>
            </div>

        }
    };

    render() {
        return (
            <div className="ui placeholder segment containerForm">
                <div className="ui two column centered grid">
                    <div className="column">
                        <Form
                            formField={formField}
                            buttonField={buttonField}
                            nameForm={`forgotPassword`}
                        />
                    </div>
                </div>
                {this.renderLoader()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        attemptingResponse: state.attemptingResponse[`forgotPassword`]
    }

};
export default connect(
    mapStateToProps, {setResponseMessageError}
)(ForgotPassword)
