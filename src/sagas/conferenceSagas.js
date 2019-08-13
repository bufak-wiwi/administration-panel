import { call, put, select } from 'redux-saga/effects'
import ConferenceActions from '../redux/conferenceRedux'
import AuthActions from '../redux/authRedux'
import { apiFetch } from '../utils/functions'

export function* getConference() {
    try {
        yield put(ConferenceActions.updateConferenceFetching(true))
        yield put(ConferenceActions.updateConferenceError(false))
        const { conferenceId } = yield select(state => state.conference);
        const { token } = yield select(state => state.auth)
        if (conferenceId && token ) {
            const conference = yield call(apiFetch, `conferences/${conferenceId}`, 'get')
            yield put(ConferenceActions.updateConference(conference))
            yield put(ConferenceActions.updateConferenceFetching(false))
        }
    } catch(e) {
        yield put(ConferenceActions.updateConferenceFetching(false))
        yield put(ConferenceActions.updateConferenceError(true))
        console.log('GetConference', e)
    }
}

export function* applyForConference(action) {
    try {
        yield put(ConferenceActions.updateConferenceFetching(true))
        yield put(ConferenceActions.updateConferenceError(false))
        const { data } = action
        if ( data ) {
            const result = yield call(apiFetch, 'Conference_Application', 'post', data)
            if (result) {
                const { userForConference } = yield select(state => state.auth)
                const { conferenceId } = yield select(state => state.conference)
                // update UserForConference manually because it gets only updated by reloading the page
                var updatedObj = JSON.parse(JSON.stringify(userForConference));
                updatedObj.find(x => x.conference_ID === conferenceId)["applied"] = true
                yield put(AuthActions.updateUserForConference(updatedObj))
            } else {
                yield put(ConferenceActions.updateConferenceError(true))
            }
            yield put(ConferenceActions.updateConferenceFetching(false))
        }
    } catch(e) {
        yield put(ConferenceActions.updateConferenceFetching(false))
        yield put(ConferenceActions.updateConferenceError(true))
        console.log('ApplyForConference', e)
    }
}

// Administrator
export function* updatePhases(action) {
    try {
        // start loading and reset error
        yield put(ConferenceActions.updateConferenceFetching(true))
        yield put(ConferenceActions.updateConferenceError(false))

        const { data } = action
        const { conferenceId } = yield select(state => state.conference);
        if (data && conferenceId) {
            // make api call
            const result = yield call(apiFetch, 'Conferences/phases', 'put', data)
            if (!result) {
                yield put(ConferenceActions.updateConferenceError(true))
            }
            // stop loading
            yield put(ConferenceActions.updateConferenceFetching(true))
        } 
    } catch(e) {
        // catch error and stop loading
        yield put(ConferenceActions.updateConferenceFetching(false))
        yield put(ConferenceActions.updateConferenceError(true))
        console.log(e)
    }
} 

export function* getApplicationList() {
    try {
        const result = yield call(apiFetch, 'Conference_Application/forConference', 'get')
        if (result) {
            yield put(ConferenceActions.updateApplicationList(result))
        }
    } catch(e) {
        console.log(e)
    }
}

export function* uploadApplicationStatusChange(action) {
    try {
        const { data } = action
        const result = yield call(apiFetch, 'Conference_Application/bulkstatus', 'put', data)
        if (result) {
            yield call(getApplicationList)
        }
    } catch(e) {
        console.log(e)
    }
}

export function* getApplication(action) {
    try {
        yield put(ConferenceActions.updateConferenceFetching(true))
        yield put(ConferenceActions.updateConferenceError(false))
        const { uid } = action
        const result = yield call(apiFetch, 'Conference_Application/single/' + uid, 'get')
        if (result) {
            yield put(ConferenceActions.updateApplication(result))
        } else {
            yield put(ConferenceActions.updateConferenceError(true))
        }
        yield put(ConferenceActions.updateConferenceFetching(false))
    } catch(e) {
        console.log(e)
        yield put(ConferenceActions.updateConferenceFetching(false))
        yield put(ConferenceActions.updateConferenceError(true))
    }
}

export function* uploadApplication(action) {
    try {
        const { application } = action
        const result = yield call(apiFetch, 'Conference_Application/single/', 'put', application)
        if (result) {
            yield call(getApplication, {uid: application.applicantUID})
        }
    } catch(e) {
        console.log(e)
    }
}

export function* checkPassword(action) {
    try {
        yield put (ConferenceActions.updateConferenceError(false))
        yield put (ConferenceActions.updateConferenceFetching(true))
        const { password } = action
        const { user } = yield select(state => state.auth);
        const result = yield call(apiFetch, 'ApplicationAuths/', 'PUT', { password, council_ID: user.councilID })
        if (result && result.passwordFound) {
            yield put(ConferenceActions.updateIsPasswordValid(result.passwordFound, result.prioriy, result.isOtherKey || false))
            yield put(ConferenceActions.updatePassword(password))
        } else {
            yield put (ConferenceActions.updateConferenceError(true))
        }
        yield put (ConferenceActions.updateConferenceFetching(false))
    } catch(e) {
        yield put (ConferenceActions.updateConferenceError(true))
        yield put (ConferenceActions.updateConferenceFetching(false))
        console.log(e)
    }
}