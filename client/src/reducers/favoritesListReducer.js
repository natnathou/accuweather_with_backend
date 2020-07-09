import {FETCH_FAVORITES_WEATHER, REMOVE_ITEM_FROM_FAVORITES, ADD_ITEM_FROM_FAVORITES} from '../actions/type'
import _ from 'lodash'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_FAVORITES_WEATHER:
            return {...state, [action.payload.id]: {name: action.payload.name, ...action.payload.response}};
        case ADD_ITEM_FROM_FAVORITES:
            return {...state, [action.payload.id]: {name: action.payload.name, ...action.payload.data}};
        case REMOVE_ITEM_FROM_FAVORITES:
            return {..._.omit({...state}, action.payload)};
        default:
            return state;
    }
}