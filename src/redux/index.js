import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./authRedux').reducer,
    conference: require('./conferenceRedux').reducer,
    council: require('./councilRedux').reducer,
})

export default rootReducer