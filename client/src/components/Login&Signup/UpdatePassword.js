import React from 'react'
import {connect} from "react-redux"
import Form from "../Form/Form"
import buttonField from "../Form/json/buttonField"
import formField from "../Form/json/formField"
import Cookies from "js-cookie"
import history from "../../history/history"
import {setResponseMessageError, displayModal} from "../../actions/actions"

class UpdatePassword extends React.Component {
    state={authenticated:false,user:null,error:null};
    
    componentDidMount(){
        this.props.setResponseMessageError("",`updatePassword`);
        fetch("/auth/update-password/authenticate", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              'Authorization': `${Cookies.get('JWT')}`
            }
          })
            .then(response => {
              if (response.status === 200) return response.json();
              throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
              console.log(responseJson);
              this.setState({
                authenticated: true,
              });
            })
            .catch(error => {
                this.props.displayModal(true,error["message"]);
              this.setState({
                authenticated: false,
                error: "Failed to authenticate user"
              });
              history.push("/")
            });
    
    }

    renderLoader=()=>{
      if(this.props.attemptingResponse){
          return  <div className="ui active inverted dimmer">
                      <div className="ui text loader"></div>
                  </div>
         
         
      }
  };
        render(){
            if(this.state.authenticated){
                return (
                    <div className="ui placeholder segment containerForm">
                        <div className="ui two column centered grid">
                            <div className="column">
                                <Form
                                    formField={formField}
                                    buttonField={buttonField}
                                    nameForm={`updatePassword`}
                                 />
                           </div>
                        </div>
                    {this.renderLoader()}
                    </div>
                )
            }
            else{
                return null
            }
        }
    
}

const mapStateToProps = (state) => {
  return {
      attemptingResponse  :state.attemptingResponse[`updatePassword`]
  }

};
export default connect(
  mapStateToProps,{setResponseMessageError,displayModal}
)(UpdatePassword)

