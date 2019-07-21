import { takeLatest, takeEvery, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/authRedux'
import { ConferenceTypes } from '../redux/conferenceRedux';
import { CouncilTypes } from '../redux/councilRedux';

/* ------------- Sagas ------------- */
import { login, logout, rehydrateState, registerUser } from './authSagas'
import { getConference, applyForConference } from './conferenceSagas'
import { getCouncil, getCouncilList } from './councilSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // Auth
    takeLatest(AuthTypes.LOGIN, login),
    takeEvery(AuthTypes.LOGOUT, logout),
    takeEvery(AuthTypes.REGISTER_USER, registerUser),
    takeEvery(AuthTypes.REHYDRATE_STATE, rehydrateState),
    // Conference
    takeEvery(ConferenceTypes.GET_CONFERENCE, getConference),
    takeLatest(ConferenceTypes.APPLY_FOR_CONFERENCE, applyForConference),
    // Council
    takeEvery(CouncilTypes.GET_COUNCIL, getCouncil),
    takeEvery(CouncilTypes.GET_COUNCIL_LIST, getCouncilList),
  ])
}
