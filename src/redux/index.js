import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./authRedux').reducer,
})

export default rootReducer