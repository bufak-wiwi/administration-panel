import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./authRedux').reducer,
    conference: require('./conferenceRedux').reducer,
})

export default rootReducer