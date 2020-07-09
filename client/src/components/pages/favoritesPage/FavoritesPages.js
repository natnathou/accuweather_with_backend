import React from 'react'
import {connect} from 'react-redux'
import Cookies from "js-cookie"
import history from '../../../history/history'
import {removeItemFromFavorites, changeItemDisplay, fetchListFavorites, displayModal} from '../../../actions/actions'
import icon from '../../../weatherIcon/iconWeather'
import '../../../style/favoritesList.css'

class FavoritesPage extends React.Component {
    state={user:{}, authenticated:false};
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
                    user         : responseJson.user.data._id
                });

                this.props.fetchListFavorites(responseJson.user.data._id)
                
            })
            .catch(error => {
                this.props.displayModal(true,error["message"]);
                this.setState({
                    authenticated: false,
                    error        : "Failed to authenticate user"
                });
                history.push('/login')
            });
    }

    renderFavorite = () => {
        let toObjectFavoritesList = Object.keys(this.props.favoritesList).map(key => ({
            id  : key,
            data: this.props.favoritesList[key]
        }));

        if (toObjectFavoritesList[0]) {
            return toObjectFavoritesList.map((datas, index) => {
                return <div className="ui cards" key={index}>
                    <div className="card renderInfo">
                        <div className="content">
                            <img className="right floated mini ui image" alt={datas.data.name}
                                 src={`${icon[`icon${datas.data['WeatherIcon']}`]}`}/>
                            <div className="header">
                                {datas.data.name}
                            </div>
                            <div className="meta">
                                {
                                    this.props.valueMetricOrImperial === "C°"
                                        ?
                                        `${datas.data.Temperature.Metric.Value} ${datas.data.Temperature.Metric.Unit}°`
                                        :
                                        `${datas.data.Temperature.Imperial.Value} ${datas.data.Temperature.Imperial.Unit}°`
                                }
                            </div>
                            <div className="description">
                                {datas.data.WeatherText}
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic red button" onClick={e => {
                                    this.props.removeItemFromFavorites(datas.id, this.state.user)
                                }}>
                                    Remove
                                </div>
                                <div className="ui basic positive button" onClick={
                                    e => {
                                        this.props.changeItemDisplay(datas.id, datas.data.name).then()
                                    }
                                }>View
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            })
        }
    };

    render() {
        return (
            <div className='favoritesLists' style={{paddingTop: `50px`}}>
                {this.renderFavorite()}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        favoritesList        : state.favoritesList,
        valueMetricOrImperial: state.valueMetricOrImperial,
        modeLightOrDark      : state.modeLightOrDark
    }
};
export default connect(
    mapStateToProps, {removeItemFromFavorites, changeItemDisplay,fetchListFavorites,displayModal}
)(FavoritesPage);
