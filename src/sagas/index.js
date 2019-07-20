import { takeLatest, takeEvery, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/authRedux'

/* ------------- Sagas ------------- */
import { login, logout, rehydrateState } from './authSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // Auth
    takeLatest(AuthTypes.LOGIN, login),
    takeEvery(AuthTypes.LOGOUT, logout),
    takeEvery(AuthTypes.REHYDRATE_STATE, rehydrateState),
  ])
}
