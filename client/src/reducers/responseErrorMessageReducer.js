import {RESPONSE_ERROR_MESSAGE} from "../actions/type"
import nameForm from "../components/Form/json/nameForm"


const initialState = {}

nameForm.forEach(data => {
    initialState[data] = ""
})

//if display all error (before that we send our form)
export default (state = initialState, action) => {

    switch (action.type) {
        case RESPONSE_ERROR_MESSAGE:
            return {...state, [action.formName]: action.payload}
        default:
            return state
    }
}