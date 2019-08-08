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
          userForConference: result.userForConference
        })

        if (remeberMe) {
          localStorage.setItem('data', data);
        } else {
          sessionStorage.setItem('data', data);
        }

        yield put(AuthActions.updateToken(result.tokenString))
        yield put(AuthActions.updateUser(result.user))
        yield put(ConferenceActions.updateConferenceList(result.conferences))
        yield put(AuthActions.updateUserForConference( result.userForConference))
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
    yield put(AuthActions.updateUserForConference( result.userForConference))
    yield put(AuthActions.updateFetching(false))
  }
}

export function* registerUser(params){
  try{
  const {council_id, name, surname, birthday, email, password, sex, note, address} = params.params
  yield put(AuthActions.updateFetching(true))
  const result = yield call(apiFetch, 'Users', 'post', {council_id, name, surname, birthday, email, password, sex, note, address})
  if (result.jwttoken) {
    yield put(AuthActions.login(email, password))
  }
}
catch (e){
  console.log(e)
}

}

export function* getUser(uid){
  try{
    const result = yield call(apiFetch, `Users/${uid}`, 'get')
  } catch(e) {
    console.log('Error at getting User', e)
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