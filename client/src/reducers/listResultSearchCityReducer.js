import {DISPLAY_RESULT_SEARCH_CITY, RESET_RESULT_SEARCH_CITY} from '../actions/type'

export default (state = [], action) => {
    switch (action.type) {
        case DISPLAY_RESULT_SEARCH_CITY:
            return [...action.payload];
        case RESET_RESULT_SEARCH_CITY:
            return [];
        default:
            return state;
    }
}
