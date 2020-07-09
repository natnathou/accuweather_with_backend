import {SET_MODE_DARK_OR_LIGHT} from '../actions/type'

export default (state = 'Light', action) => {
    switch (action.type) {
        case SET_MODE_DARK_OR_LIGHT:
            return action.payload;
        default:
            return state;
    }
}
