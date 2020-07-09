import {DISPLAY_MODAL} from '../actions/type'

export default (state = {
    status : false,
    message: ''
}, action) => {
    switch (action.type) {
        case DISPLAY_MODAL:
            return {...state, ...{status: action.payload.status}, ...{message: action.payload.message}};
        default:
            return state;
    }
}
