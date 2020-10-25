import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: require('./authRedux').reducer,
    conference: require('./conferenceRedux').reducer,
    council: require('./councilRedux').reducer,
    workshop: require('./workshopRedux').reducer,
    voting: require('./votingRedux').reducer,
})

export default rootReducer