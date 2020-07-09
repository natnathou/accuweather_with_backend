import {SET_MECTRIC_OR_IMPERIAL} from '../actions/type'

export default (state = 'C°', action) => {
    switch (action.type) {
        case SET_MECTRIC_OR_IMPERIAL:
            return action.payload;
        default:
            return state;
    }
}
