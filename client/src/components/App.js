import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import {connect} from "react-redux"
import history from '../history/history'
import ModalBasicExample from './modal/ModalBasicExample'
import Header from './header/Header'
import Signup from "./Login&Signup/Signup"
import Login from "./Login&Signup/Login"
import ForgotPassword from "./Login&Signup/ForgotPassword"
import UpdatePassword from "./Login&Signup/UpdatePassword"
import HomePage from './pages/homePage/HomePage'
import FavoritesPage from './pages/favoritesPage/FavoritesPages'
import {fetchItemDisplay, fetchPosition} from '../actions/actions'
import "../style/app.css"

class App extends React.Component {
    state = {position: null, errorMessage: null};

    componentDidMount() {
        
        //display tel aviv city by default if the user refuse to share position
        this.props.fetchItemDisplay("215854", "Tel Aviv");
        this.props.fetchPosition()
    }


    render() {
        return (
            <Router history={history}>
                <div className="ui container">
                    <Header/>
                    <Switch>
                        <Route exact path="/">
                            <HomePage/>
                        </Route>
                        <Route exact path="/favorites">
                            <FavoritesPage/>
                        </Route>
                        <Route exact path="/signup">
                            <Signup/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/forgot-password">
                            <ForgotPassword/>
                        </Route>
                        <Route exact path="/update-password">
                            <UpdatePassword/>
                        </Route>
                    </Switch>
                    <ModalBasicExample/>
                </div>
            </Router>

        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
};
export default connect(
    mapStateToProps, {fetchItemDisplay, fetchPosition}
)(App);
