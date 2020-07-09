import {combineReducers} from 'redux'
import valueSearchBarReducers from './valueSearchBarReducers'
import errorReducer from './errorReducer'
import listResultSearchCityReducer from './listResultSearchCityReducer'
import favoritesListReducer from './favoritesListReducer'
import itemToDisplayReducer from './itemToDisplayReducer'
import metricOrImperialReducer from './metricOrImperialReducer'
import modeLightOrDarkReducer from './modeLightOrDarkReducer'
import formValueReducer from './formValueReducer'
import formPropsReducer from './formPropsReducer'
import errorReducerForm from "./displayErrorForm"
import responseErrorMessageReducer from "./responseErrorMessageReducer"
import attemptingResponseReducer from "./attemptingResponseReducer"


export default combineReducers({
    valueSearchBar       : valueSearchBarReducers,
    listResultSearchCity : listResultSearchCityReducer,
    error                : errorReducer,
    favoritesList        : favoritesListReducer,
    itemToDisplay        : itemToDisplayReducer,
    valueMetricOrImperial: metricOrImperialReducer,
    modeLightOrDark      : modeLightOrDarkReducer,
    formValue           : formValueReducer,
    formProps           : formPropsReducer,
    displayError        : errorReducerForm,
    responseErrorMessage: responseErrorMessageReducer,
    attemptingResponse  : attemptingResponseReducer
})