import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./authRedux').reducer,
    conference: require('./conferenceRedux').reducer,
    council: require('./councilRedux').reducer,
    workshop: require('./workshopRedux').reducer,
})

export default rootReducer