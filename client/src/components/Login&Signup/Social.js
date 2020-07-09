import React, { Component } from 'react'
import {connect} from "react-redux"
import {displayLoader,signInSocialNetwork} from "../../actions/actions"

export class Social extends Component {
    _handleSignInClickGoogle = async () => {
        this.props.signInSocialNetwork("google",this.props.nameForm)
      };

    _handleSignInClickFacebook = async () => {
        this.props.signInSocialNetwork("facebook",this.props.nameForm)
      };

    
    render() {
        return (
            <div className="ui form">
                <div className="field" onClick={this._handleSignInClickGoogle}>
                    <div className="ui two buttons">
                    <button className="ui google plus button">
                        <i className="google icon"></i>
                        Google
                     </button>
                    </div>                   
                </div>
                <div className="field">
                    <div className="two ui buttons">
                    <button className="ui facebook button" onClick={this._handleSignInClickFacebook}>
                        <i className="facebook icon"></i>
                        Facebook
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        nameForm            : ownProps.nameForm,
        attemptingResponse  :state.attemptingResponse[ownProps.nameForm]
    }

};
export default connect(
    mapStateToProps, {displayLoader,signInSocialNetwork}
)(Social)
