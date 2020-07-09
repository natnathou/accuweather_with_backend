import {ATTEMPTING_RESPONSE} from "../actions/type"
import nameForm from "../components/Form/json/nameForm"


const initialState = {}

nameForm.forEach(data => {
    initialState[data] = false
})

//if display all error (before that we send our form)
export default (state = initialState, action) => {

    switch (action.type) {
        case ATTEMPTING_RESPONSE:
            return {...state, [action.formName]: action.payload}
        default:
            return state
    }
}