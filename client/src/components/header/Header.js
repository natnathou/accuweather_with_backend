import React, {Component} from 'react'
import {Link} from "react-router-dom"
import Cookies from "js-cookie"
import DropdownMetricImperial from "./DropdownMetricImperial"
import DropdownDark from "./DropdownDark"


class Header extends Component {

    constructor(props) {
        super(props);
        this.state       = {toggle: false};
        this.user         = {};
        this.error        = null;
        this.authenticated= false;
        this.refPushable = React.createRef()
    }

    componentDidMount() {
        fetch("/auth/login/success", {
            method     : "GET",
            credentials: "include",
            headers    : {
                Accept                            : "application/json",
                "Content-Type"                    : "application/json",
                "Access-Control-Allow-Credentials": true,
                'Authorization'                   : `${Cookies.get('jwt')}`
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
                    user         : responseJson.user.data
                });
            })
            .catch(error => {
                this.setState({
                    authenticated: false,
                    error        : "Failed to authenticate user"
                });
            });
    }

    Toggle = () => {
        this.setState({toggle: !this.state.toggle})

    };

    handleClick = () => {
        this.refPushable.current.style.cssText = "display: none";
        this.setState({toggle: false})
    };
    _handleLogout = () => {
        window.open(`${process.env.REACT_APP_URL_SERVER}/auth/logout`, "_self");
        Cookies.set('jwt', false);
    };

    render() {
        return (
            <div>
                <div className="ui grid">
                    {/*for bigScreen*/}
                    <div className="computer only row">
                        <div className="column">
                            <div className="ui secondary pointing menu barMenu" style={{paddingBottom: `10px`}}>
                                <Link to="/" className="item menuHeader">
                                    <h2>
                                        Weather App
                                    </h2>
                                </Link>
                                <h4 className="right menu">
                                    <div className="item">
                                        <Link to="/" className="item menuLink">
                                            Home
                                        </Link>
                                        {
                                        this.state.authenticated 
                                            ?
                                                
                                            <Link to="/favorites" className="item menuLink">
                                                Favorites
                                            </Link>
                                            :
                                            null
                                        }
                                        
                                        {
                                        !this.state.authenticated 
                                            ?
                                                
                                            <Link to="/login" className="item buttonSocial teal">
                                                    Login
                                            </Link>
                                            :
                                            null
                                        }
                                        {
                                        !this.state.authenticated 
                                            ?
                                        
                                            <Link to="/signup" className="item buttonSocial blue-twitter">
                                                    Signup
                                            </Link>
                                            :
                                            <Link 
                                            to=""
                                            className="item menuLink buttonSocial red" 
                                            onClick={this._handleLogout} 
                                            >
                                                    Logout
                                            </Link>
                                        }
                                    </div>
                                    <DropdownMetricImperial/>
                                    <DropdownDark/>
                                </h4>
                            </div>
                        </div>
                    </div>
                    {/*for smallScreen*/}
                    <div className="tablet mobile only row">
                        <div className="column">
                            <div className="ui secondary pointing menu barMenu" style={{paddingBottom: `10px`}}>
                                <Link to="/" className="item menuHeader">
                                    <h2>
                                        Weather App
                                    </h2>
                                </Link>
                                <div className="right menu">
                                    <DropdownMetricImperial/>
                                    <DropdownDark/>
                                    <div className="item">
                                        <div id="mobile_item" className="item menuHeader" onClick={this.Toggle}>
                                            <i className="bars icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {
                    this.state.toggle
                        ?
                        <div className="overflowCondition containerPushable">
                            <div className="Pushables" ref={this.refPushable} onClick={this.handleClick}>
                                <div className="ui floated right">
                                    <div className="ui vertical menu menuLink">

                                        <Link to="/" className="item menuLink">
                                            Home
                                        </Link>
                                        {
                                        this.state.authenticated 
                                            ?
                                                
                                            <Link to="/favorites" className="item menuLink">
                                                Favorites
                                            </Link>
                                            :
                                            null
                                        }
                                        {
                                        !this.state.authenticated 
                                            ?
                                                
                                            <Link to="/login" className="item  buttonSocialTabelette teal">
                                                    Login
                                            </Link>
                                            :
                                            null
                                        }
                                        {
                                        !this.state.authenticated 
                                            ?
                                        
                                            <Link to="/signup" className="item  buttonSocialTabelette blue-twitter">
                                                    Signup
                                            </Link>
                                            :
                                            <Link to="" className="item buttonSocialTabelette red" onClick={this._handleLogout}>
                                                    Logout
                                            </Link>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>


        );
    }
}

export default Header
