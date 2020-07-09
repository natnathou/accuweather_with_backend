import _ from "lodash"
import {
    FORM_PROPS_INITIALIZE,
    FORM_PROPS_RADIO_INITIALIZE,
    FORM_PROPS_MODIFY,
    FORM_PROPS_RADIO_MODIFY,
    FORM_PROPS_RADIO_MODIFY_PROPERTY
} from "../actions/type"
import nameForm from "../components/Form/json/nameForm"


const initialState = {}

nameForm.forEach(data => {
    initialState[data] = null
})

//form props reducer all input have some ownprops linke touche, error...
export default (state = initialState, action) => {
    switch (action.type) {
        case FORM_PROPS_INITIALIZE:
            return {...state, [action.formName]: {...state[action.formName], ...action.payload}}

        case FORM_PROPS_RADIO_INITIALIZE:
            let property       = {...state[action.formName][action.payload.propriety], ...action.payload.formValue[action.payload.propriety]}
            let objectProperty = {...state[action.formName], [action.payload.propriety]: property}
            return {...state, [action.formName]: objectProperty}

        case FORM_PROPS_MODIFY:
            let update = {
                ...state[action.formName],
                [_.keys(action.payload)]: {...state[action.formName][_.keys(action.payload)], ...action.payload[_.keys(action.payload)]}
            }
            return {...state, [action.formName]: update}
        case FORM_PROPS_RADIO_MODIFY:
            let property2   = _.keys(action.payload)
            let subProperty = _.keys(action.payload[property2])
            let obj         = {...state[action.formName][property2][subProperty], ...action.payload[property2][subProperty]}
            let newObj      = {[subProperty]: obj}
            let update2     = {
                ...state[action.formName],
                [property2]: {...state[action.formName][property2], ...newObj}
            }
            return {...state, [action.formName]: update2}
        case FORM_PROPS_RADIO_MODIFY_PROPERTY:
            let key      = _.keys(action.payload)
            let objError = action.payload[_.keys(action.payload)]
            let update3  = {...state[action.formName], [key]: {...state[action.formName][key], ...objError}}
            return {...state, [action.formName]: update3}
        default:
            return state
    }
}