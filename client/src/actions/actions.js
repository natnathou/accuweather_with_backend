import accuWeather from '../api/accuWeather'
import history from '../history/history'
import _ from "lodash"
import Cookies from "js-cookie"
import apiCallMyServer from "../api/apiServer"
import {
    SEARCH_BAR_CHANGE,
    SEARCH_BAR_RESET,
    SEARCH_CITY,
    DISPLAY_MODAL,
    DISPLAY_RESULT_SEARCH_CITY,
    FETCH_LIST_FAVORITES_WEATHER,
    FETCH_FAVORITES_WEATHER,
    ADD_ITEM_FROM_FAVORITES,
    REMOVE_ITEM_FROM_FAVORITES,
    CHANGE_ITEM_DISPLAY,
    FETCH_ITEM_DISPLAY,
    RESET_RESULT_SEARCH_CITY,
    SET_MECTRIC_OR_IMPERIAL,
    SET_MODE_DARK_OR_LIGHT,
    FETCH_POSITION,
    FORM_MODIFY,
    RADIO_MODIFY,
    FORM_SEND,
    FORM_RESET,
    FORM_PROPS_INITIALIZE,
    FORM_PROPS_RADIO_INITIALIZE,
    FORM_PROPS_MODIFY,
    FORM_PROPS_RADIO_MODIFY,
    FORM_PROPS_RADIO_MODIFY_PROPERTY,
    DISPLAY_ERROR,
    RESPONSE_ERROR_MESSAGE,
    ATTEMPTING_RESPONSE,
    SIGN_IN_SOCIAL_NETWORK
} from './type'

export const displayModal = (status, message) => {
    return {type: DISPLAY_MODAL, payload: {status, message}}
};

export const setMetricOrImperial = (value) => {
    return {type: SET_MECTRIC_OR_IMPERIAL, payload: value}
};

export const setModeDarkOrLight = (value) => {
    return {type: SET_MODE_DARK_OR_LIGHT, payload: value}
};

export const fetchPosition = () => async dispatch => {
    await navigator.geolocation.getCurrentPosition(async position => {
        let response = [];
        try {
            response = await accuWeather.get(`locations/v1/cities/geoposition/search?`, {
                params: {
                    apikey  : process.env.REACT_APP_KEY_ACCU_WEATHER,
                    q       : `${position.coords.latitude},${position.coords.longitude}`,
                    language: 'en-US'

                }
            });
            dispatch(fetchItemDisplay(response.data.Key, response.data.LocalizedName))
        } catch (e) {
            dispatch(displayModal(true, e['message']))
        }

    }, err => {
        dispatch(displayModal(true, err["message"]))
    });
    dispatch({type: FETCH_POSITION})
};

export const searchBarInput = (valueInput) => {
    return {type: SEARCH_BAR_CHANGE, payload: valueInput}
};

export const resetSearchBarInput = () => {
    return {type: SEARCH_BAR_RESET}
};

export const searchCity = valueInput => async (dispatch, getState) => {
    let response = [];
    try {
        response = await accuWeather.get(`locations/v1/cities/autocomplete?`, {
            params: {
                apikey  : process.env.REACT_APP_KEY_ACCU_WEATHER,
                q       : getState().valueSearchBar,
                language: 'en-US'
            }
        });
        await dispatch(displayResultSearchCity(response.data))
    } catch (e) {
        dispatch(displayModal(true, e['message']))
    }
    dispatch({type: SEARCH_CITY, payload: valueInput})
};

export const resetSearchCity = () => {
    return {type: RESET_RESULT_SEARCH_CITY}
};

export const fetchItemDisplay = (id, name) => async dispatch => {
    let responseFahrenheit = [];
    let responseCelsius    = [];
    let response           = [];

    try {
        response           = await accuWeather.get(`currentconditions/v1/${id}?`, {
            params: {
                apikey  : process.env.REACT_APP_KEY_ACCU_WEATHER,
                details : false,
                language: 'en-US'

            }
        });
        responseCelsius    = await accuWeather.get(`forecasts/v1/daily/5day/${id}?`, {
            params: {
                apikey  : process.env.REACT_APP_KEY_ACCU_WEATHER,
                details : false,
                language: 'en-US',
                metric  : true

            }
        });
        responseFahrenheit = await accuWeather.get(`forecasts/v1/daily/5day/${id}?`, {
            params: {
                apikey  : process.env.REACT_APP_KEY_ACCU_WEATHER,
                details : false,
                language: 'en-US',
                metric  : false

            }
        });

    } catch (e) {
        await dispatch(displayModal(true, e['message']));
        return null
    }

    dispatch({
        type   : FETCH_ITEM_DISPLAY,
        payload: {
            id,
            name,
            response          : response.data[0],
            responseCelsius   : responseCelsius.data.DailyForecasts,
            responseFahrenheit: responseFahrenheit.data.DailyForecasts
        }
    })
};


export const displayResultSearchCity = citys => {
    return {type: DISPLAY_RESULT_SEARCH_CITY, payload: citys}
};

export const fetchListFavorites = (id) => async dispatch => {

    fetch(`/favorites/list?id=${id}`, {
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
            responseJson.favorites.map(data => {
                return dispatch(fetchFavoritesWeather(data.Key, data.LocalizedName))
            })
        })
        .catch(error => {
            dispatch(displayModal(true, error['message']));
            return null
        });


    dispatch({type: FETCH_LIST_FAVORITES_WEATHER})
}

export const fetchFavoritesWeather = (id, name) => async dispatch => {
    let response = [];
    try {
        response = await accuWeather.get(`currentconditions/v1/${id}?`, {
            params: {
                apikey  : process.env.REACT_APP_KEY_ACCU_WEATHER,
                details : false,
                language: 'en-US'

            }
        });

    } catch (e) {
        await dispatch(displayModal(true, e['message']));
        return null
    }
    dispatch({type: FETCH_FAVORITES_WEATHER, payload: {id, name, response: response.data[0]}})
};

export const addItemToFavorites = (id, name, data, idUser) => async dispatch => {

    fetch(`/favorites/list/delete?id=${idUser}&idItem=${id}&nameItem=${name}`, {
        method     : "POST",
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
            return null
        })
        .catch(error => {
            dispatch(displayModal(true, error['message']));
            return null
        });

    dispatch({type: ADD_ITEM_FROM_FAVORITES, payload: {id, name, data}})
};


export const removeItemFromFavorites = (id, idUser) => async dispatch => {

    fetch(`/favorites/list/delete?id=${idUser}&idItem=${id}`, {
        method     : "POST",
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
            return null
        })
        .catch(error => {
            dispatch(displayModal(true, error['message']));
            return null
        });

    dispatch({type: REMOVE_ITEM_FROM_FAVORITES, payload: id})
};

export const changeItemDisplay = (id, name) => async dispatch => {
    await dispatch(fetchItemDisplay(id, name));
    history.push('/');
    dispatch({type: CHANGE_ITEM_DISPLAY})
};


//to update formValue Reducer
export const formModify = (formValue, formName) => {
    return {type: FORM_MODIFY, payload: formValue, formName: formName}
};

//to update formValue Reducer if the input is a radio
export const radioModify = (formValue, propriety, subPropriety, formName) => {
    return {type: RADIO_MODIFY, payload: {formValue, propriety, subPropriety}, formName: formName}
};

//check if their is an error befor to send our form to the server
export const formSend = (nameForm) => async (dispatch, getState) => {
    let toArray = _.toArray(getState()["formProps"][nameForm]);
    let err     = false;
    toArray.map(data => {
        if (data.error) {
            err = true
        }
        return null
    });


    dispatch(errorStatue(err, nameForm));
    if (!err) {
        switch (nameForm) {
            case "signup":
                try {
                    dispatch(displayLoader(true, nameForm))
                    if (getState()["formValue"][nameForm]["password"] !== getState()["formValue"][nameForm]["passwordConfirmation"]) {
                        dispatch(setResponseMessageError("Password Confirmation doesn't match", nameForm));
                        dispatch(displayLoader(false, nameForm));
                        return null
                    }
                    let param  = {
                        username: getState()["formValue"][nameForm]["username"],
                        email   : getState()["formValue"][nameForm]["email"],
                        password: getState()["formValue"][nameForm]["password"]
                    };
                    let config = {
                        headers    : {
                            Accept                            : "application/json",
                            "Content-Type"                    : "application/json",
                            "access-control-allow-origin"     : "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        credentials: "include"
                    };

                    let response = await apiCallMyServer.post(`/auth/register`, param, config);
                    if (response.status === 200) {
                        if (response.data.message) {
                            dispatch(displayLoader(false, nameForm));
                            dispatch(setResponseMessageError(response.data.message, nameForm))
                        }
                        if (response.data.redirect) {
                            window.location = response.data.redirect
                        }

                    }
                } catch (e) {
                    displayModal(true, e['message'])
                }
                return null;

            case "login":
                try {
                    dispatch(displayLoader(true, nameForm));

                    let param  = {
                        username: getState()["formValue"][nameForm]["username"],
                        password: getState()["formValue"][nameForm]["password"]
                    };
                    let config = {
                        headers    : {
                            Accept                            : "application/json",
                            "Content-Type"                    : "application/json",
                            "access-control-allow-origin"     : "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        credentials: "include"
                    };

                    let response = await apiCallMyServer.post(`/auth/login`, param, config);
                    if (response.status === 200) {
                        if (response.data.message) {
                            dispatch(displayLoader(false, nameForm));
                            dispatch(setResponseMessageError(response.data.message, nameForm))
                        }
                        if (response.data.redirect) {
                            window.location = response.data.redirect
                        }
                    }
                } catch (e) {
                    displayModal(true, e['message'])
                }
                return null

            case "forgotPassword":
                try {
                    dispatch(displayLoader(true, nameForm));

                    let param  = {
                        email: getState()["formValue"][nameForm]["email"],
                    };
                    let config = {
                        headers    : {
                            Accept                            : "application/json",
                            "Content-Type"                    : "application/json",
                            "access-control-allow-origin"     : "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        credentials: "include"
                    };

                    let response = await apiCallMyServer.post(`/auth/forgot-password`, param, config)
                    if (response.status === 200) {
                        dispatch(displayLoader(false, nameForm))
                        dispatch(setResponseMessageError(response.data.message, nameForm))
                    }
                } catch (e) {
                    displayModal(true, e['message'])
                }
                return null;
            case "updatePassword":
                try {
                    dispatch(displayLoader(true, nameForm))
                    if (getState()["formValue"][nameForm]["password"] !== getState()["formValue"][nameForm]["passwordConfirmation"]) {
                        dispatch(setResponseMessageError("Password Confirmation doesn't match", nameForm))
                        dispatch(displayLoader(false, nameForm))
                        return null
                    }

                    let param  = {
                        password: getState()["formValue"][nameForm]["password"],
                        token   : Cookies.get('JWT')
                    };
                    let config = {
                        headers    : {
                            Accept                            : "application/json",
                            "Content-Type"                    : "application/json",
                            "access-control-allow-origin"     : "*",
                            "Access-Control-Allow-Credentials": true,
                            'Authorization'                   : `${Cookies.get('JWT')}`
                        },
                        credentials: "include"
                    };

                    let response = await apiCallMyServer.post(`/auth/update-password`, param, config)
                    if (response.status === 200) {
                        window.location = response.data.redirect
                    }
                } catch (e) {
                    displayModal(true, e['message'])
                }
                return null;


            default:
                return null
        }

    } else {
        dispatch(displayModal(true, "Form doesn't valid!"));
    }
    dispatch(
        {type: FORM_SEND}
    )
};

export const formReset = (json, nameForm) => (dispatch, getState) => {

    dispatch(errorStatue(false, nameForm));
    json.map(data => {
        switch (data.type) {
            case "file":
                dispatch(formModify({[data.name]: [""]}, nameForm));
                dispatch(formPropsInitialize({
                    [data.name]: {
                        touch            : false,
                        required         : data.required,
                        display          : data.display,
                        extensionAccepted: data.extensionAccepted,
                        filesContent     : []
                    }
                }, nameForm));
                getState()["formValue"][nameForm][data.name][0] === "" && getState()["formProps"][nameForm][data.name]["required"]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null;
            case "text":
                dispatch(formModify({[data.name]: data.initialValue}, nameForm));
                dispatch(formPropsModify({[data.name]: {touch: false, required: data.required}}, nameForm));
                getState()["formValue"][nameForm][data.name] === "" && getState()["formProps"][nameForm][data.name]["required"]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null;
            case "email":
                dispatch(formModify({[data.name]: data.initialValue}, nameForm));
                dispatch(formPropsModify({[data.name]: {touch: false, required: data.required}}, nameForm));
                getState()["formValue"][nameForm][data.name] === "" && getState()["formProps"][nameForm][data.name]["required"]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null
            case "number":
                dispatch(formModify({[data.name]: data.initialValue}, nameForm));
                dispatch(formPropsModify({[data.name]: {touch: false, required: data.required}}, nameForm));
                getState()["formValue"][nameForm][data.name] === "" && getState()["formProps"][nameForm][data.name]["required"]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null
            case "tel":
                dispatch(formModify({[data.name]: data.initialValue}, nameForm));
                dispatch(formPropsModify({[data.name]: {touch: false, required: data.required}}, nameForm));
                getState()["formValue"][nameForm][data.name] === "" && getState()["formProps"][nameForm][data.name]["required"]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null
            case "password":
                dispatch(formModify({[data.name]: data.initialValue}, nameForm));
                dispatch(formPropsModify({[data.name]: {touch: false, required: data.required}}, nameForm));
                getState()["formValue"][nameForm][data.name] === "" && getState()["formProps"][nameForm][data.name]["required"]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null
            case "radio":
                dispatch(radioModify({[data.name]: {[data.value]: data.initialChecked}}, data.name, data.value, nameForm));
                dispatch(formPropsModify({
                    [data.name]: {
                        [data.value]: {
                            touch   : false,
                            required: data.required
                        }
                    }
                }, nameForm));
                let err        = true;
                let checkError = () => _.toArray(getState()["formValue"][nameForm][data.name]).forEach((data) => {
                    if (data) {

                        err = false
                    }
                });

                checkError()
                err && getState()["formProps"][nameForm][data.name][data.value]["required"]
                    ?
                    dispatch(formPropsRadioModifyProperty({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsRadioModifyProperty({[data.name]: {error: false}}, nameForm));
                return null
            case "checkbox":
                dispatch(formModify({[data.name]: data.initialChecked}, nameForm));
                dispatch(formPropsModify({[data.name]: {touch: false, required: data.required}}, nameForm));
                getState()["formValue"][nameForm][data.name] && getState()["formProps"][nameForm][data.name]["required"]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null;
            case "big_text":
                dispatch(formModify({[data.name]: data.initialValue}, nameForm));
                dispatch(formPropsModify({[data.name]: {touch: false, required: data.required}}, nameForm));
                getState()["formValue"][nameForm][data.name] === "" && getState()["formProps"][nameForm][data.name]["required"]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null;
            case "list":
                dispatch(formModify({[data.name]: data.initialValue}, nameForm));
                dispatch(formPropsModify({

                    [data.name]: {
                        touch      : false,
                        required   : data.required,
                        optionArray: data.optionArray
                    }

                }, nameForm));
                getState()["formValue"][nameForm][data.name] === getState()["formProps"][nameForm][data.name]["optionArray"][0]
                    ?
                    dispatch(formPropsModify({[data.name]: {error: true}}, nameForm))
                    :
                    dispatch(formPropsModify({[data.name]: {error: false}}, nameForm));
                return null;
            default:
                return null
        }
    })

    dispatch(
        {type: FORM_RESET}
    )
};



//to initialize form props reducer
export const formPropsInitialize = (formProps, formName) => {
    return {type: FORM_PROPS_INITIALIZE, payload: formProps, formName: formName}
};

//to initialize form props reducer (if it's a radio input)
export const formPropsRadioInitialize = (formValue, propriety, subPropriety, formName) => {
    return {type: FORM_PROPS_RADIO_INITIALIZE, payload: {formValue, propriety, subPropriety}, formName: formName}
};

//to update form props reducer
export const formPropsModify = (formProps, formName) => {
    return {type: FORM_PROPS_MODIFY, payload: formProps, formName}
};

//to update sub property in form props reducer (if it's a radio input) (two sub level)
export const formPropsRadioModify = (formValue, formName) => {
    return {type: FORM_PROPS_RADIO_MODIFY, payload: formValue, formName: formName}
};

//to update property in form props reducer (if it's a radio input) (one sub level)
export const formPropsRadioModifyProperty = (formValue, formName) => {
    return {type: FORM_PROPS_RADIO_MODIFY_PROPERTY, payload: formValue, formName: formName}
};

//to update display error status
export const errorStatue = (status, formName) => {
    return {type: DISPLAY_ERROR, payload: status, formName: formName}
};

//to update response message error
export const setResponseMessageError = (message, formName) => {
    return {type: RESPONSE_ERROR_MESSAGE, payload: message, formName: formName}
};

//to displayLoader
export const displayLoader = (status, formName) => {
    return {type: ATTEMPTING_RESPONSE, payload: status, formName: formName}
};

export const signInSocialNetwork = (network, formName) => async dispatch => {
    await dispatch(displayLoader(true, formName));
    switch (network) {
        case "google":
            return window.open(`${process.env.REACT_APP_URL_SERVER}/auth/google`, "_self");
        case "facebook":
            return window.open(`${process.env.REACT_APP_URL_SERVER}/auth/facebook`, "_self");
        case "twitter":
            return window.open(`${process.env.REACT_APP_URL_SERVER}/auth/twitter`, "_self");
        default:
            return {type: SIGN_IN_SOCIAL_NETWORK}
    }
};