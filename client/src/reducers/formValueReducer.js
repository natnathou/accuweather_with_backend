import {FORM_MODIFY, RADIO_MODIFY} from "../actions/type"
import nameForm from "../components/Form/json/nameForm"


const initialState = {}

nameForm.forEach(data => {
    initialState[data] = null
})


//form value reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case FORM_MODIFY:
            return {...state, [action.formName]: {...state[action.formName], ...action.payload}}
        case RADIO_MODIFY:
            let property          = {...state[action.formName][action.payload.propriety], ...action.payload.formValue[action.payload.propriety]}
            let objectProperty    = {...state[action.formName], [action.payload.propriety]: property}
            let statusSubProperty = property[action.payload.subPropriety]
            if (statusSubProperty) {
                Object.getOwnPropertyNames(property).forEach(key => {
                    if (key !== action.payload.subPropriety) {
                        property[key] = false
                    }
                })
            }
            return {...state, [action.formName]: objectProperty}
        default:
            return state
    }
}