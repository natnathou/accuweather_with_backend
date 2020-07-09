import {FETCH_ITEM_DISPLAY} from '../actions/type'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ITEM_DISPLAY:
            return {
                item              : {
                    name: action.payload.name,
                    id  : action.payload.id,
                    data: action.payload.response
                },
                day5dataCelsius   : {data: action.payload.responseCelsius},
                day5dataFahrenheit: {data: action.payload.responseFahrenheit}
            };
        default:
            return state;
    }
}
