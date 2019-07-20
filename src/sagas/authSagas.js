import { call, put } from 'redux-saga/effects'
import AuthActions from '../redux/authRedux'
import ConferenceActions from '../redux/conferenceRedux'
import { apiFetch } from '../utils/functions'

export function* login(action) { 
  try {
    yield put(AuthActions.updateFetching(true))
    yield put(AuthActions.updateError(false))
    const { email, password, remeberMe } = action
    if(email && password) {
      const result = yield call(apiFetch, 'login', 'post', { email, password })
      
      if(result.tokenString) {
        const data = JSON.stringify({
          user: result.user,
          token: result.tokenString,
          conferences: result.conferences,
          admin: result.admin,
          adminForConference: result.adminForConference
        })
        if (remeberMe) {
          localStorage.setItem('data', data);
        } else {
          sessionStorage.setItem('data', data);
        }

        yield put(AuthActions.updateToken(result.token))
        yield put(AuthActions.updateUser(result.user))
        yield put(ConferenceActions.updateConferenceList(result.conferences))
        yield put(AuthActions.updateAdmin(result.admin, result.adminForConference))
        yield put(AuthActions.updateFetching(false))

      } else {
        yield put(AuthActions.updateError(true))
        yield put(AuthActions.updateFetching(false))
      }
    }
  } catch(e) {
    yield put(AuthActions.updateError(true))
    yield put(AuthActions.updateFetching(false))
    console.log('Login:', e)
  }
}

export function* rehydrateState() {
  const result = JSON.parse(sessionStorage.getItem('data'))
  if (result.token) {
    yield put(AuthActions.updateToken(result.token))
    yield put(AuthActions.updateUser(result.user))
    yield put(ConferenceActions.updateConferenceList(result.conferences))
    yield put(AuthActions.updateAdmin(result.admin, result.adminForConference))
    yield put(AuthActions.updateFetching(false))
  }
}

export function* logout(action) {
  try {
    localStorage.clear()
    sessionStorage.clear()
    yield put(AuthActions.resetAuthState())
  } catch (e) {
    console.log('Error at logging out', e)
  }
}