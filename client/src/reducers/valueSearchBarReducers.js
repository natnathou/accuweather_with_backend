import {SEARCH_BAR_CHANGE, SEARCH_BAR_RESET} from '../actions/type'

export default (state = '', action) => {
    switch (action.type) {
        case SEARCH_BAR_CHANGE:
            return action.payload;
        case SEARCH_BAR_RESET:
            return '';
        default:
            return state;
    }
}
