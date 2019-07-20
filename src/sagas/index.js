import { takeLatest, takeEvery, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/authRedux'
import { ConferenceTypes } from '../redux/conferenceRedux';

/* ------------- Sagas ------------- */
import { login, logout, rehydrateState } from './authSagas'
import { getConference, applyForConference } from './conferenceSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // Auth
    takeLatest(AuthTypes.LOGIN, login),
    takeEvery(AuthTypes.LOGOUT, logout),
    takeEvery(AuthTypes.REHYDRATE_STATE, rehydrateState),
    // Conference
    takeEvery(ConferenceTypes.GET_CONFERENCE, getConference),
    takeLatest(ConferenceTypes.APPLY_FOR_CONFERENCE, applyForConference),
  ])
}
