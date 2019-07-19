import { call, put } from 'redux-saga/effects'
import AuthActions from '../redux/authRedux'
import { baseURL } from '../config/globals'

export function* login(action) { 
  try {
    yield put(AuthActions.updateFetching(true))
    yield put(AuthActions.updateError(false))
    const { email, password, remeberMe } = action
    if(email && password) {
      const result = yield call(signInWithEmailAndPassword, email, password)
      if(result.tokenString) {
        // navigate ? 
        if (remeberMe) {
          localStorage.setItem('login', JSON.stringify({
            user: result.user,
            token: result.tokenString
          }));
        } else {
          sessionStorage.setItem('login', JSON.stringify({
            user: result.user,
            token: result.tokenString
          }));
        }
        yield put(AuthActions.updateUser(result.user))
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

function signInWithEmailAndPassword(email, password) {
    return fetch(baseURL + 'login/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password})
    })
    .then(res => res.json())
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