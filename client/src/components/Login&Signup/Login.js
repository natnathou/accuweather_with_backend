import React from 'react'
import {connect} from "react-redux"
import Social from "./Social"
import Form from "../Form/Form"
import buttonField from "../Form/json/buttonField"
import formField from "../Form/json/formField"
import {setResponseMessageError} from "../../actions/actions"

class Login extends React.Component {
    componentDidMount() {
        this.props.setResponseMessageError("", `login`)
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
                <div className="ui two column very relaxed stackable grid">
                    <div className="column">
                        <Form
                            formField={formField}
                            buttonField={buttonField}
                            nameForm={`login`}
                        />
                    </div>
                    <div className="middle aligned column">
                        <Social nameForm={`login`}/>
                    </div>
                </div>
                <div className="ui vertical divider">
                    Or
                </div>
                {this.renderLoader()}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        attemptingResponse: state.attemptingResponse[`login`]
    }

};
export default connect(
    mapStateToProps, {setResponseMessageError}
)(Login)
