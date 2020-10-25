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

export function* getConferenceList() {
    try {
        const result = yield call(apiFetch, `conferences/`, 'get')
        if (result) {
            yield put(ConferenceActions.updateConferenceList(result))
        }
    } catch (e) {
        console.log('Error getting conferences', e)
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
                var obj = updatedObj.find(x => x.conference_ID === conferenceId)
                if (obj) {
                    obj["applied"] = true
                } else { 
                    updatedObj.push({
                        "conference_ID": data.conferenceId,
                        "applied": true,
                        "admin": false,
                        "attendee": false,
                        "rejected": false,
                        "priority": data.priority
                    })
                }
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
            const result = yield call(apiFetch, `Conferences/phases/${conferenceId}`, 'put', data)
            if (!result) {
                yield put(ConferenceActions.updateConferenceError(true))
            } else {
                yield put(ConferenceActions.updateConference(result))
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

export function* getUsers() {
    try {
        const conferenceID = yield select(state => state.conference.conferenceID);
        const users = yield call(apiFetch, `users/byconference/${conferenceID}`, 'get');
        if (users) {
            yield put(ConferenceActions.updateUsers(users))
        }
    } catch(e) {
        console.log('GetUser', e)
    }
}

export function* getTempConference(params) {
    try {
        yield put(ConferenceActions.updateConferenceFetching(true))
        yield put(ConferenceActions.updateConferenceError(false))
        yield put(ConferenceActions.updateConferenceSuccess(false))
        const { conferenceId } = params
        if (conferenceId) {
            const conference = yield call(apiFetch, `conferences/${conferenceId}`, 'get')
            yield put(ConferenceActions.updateTempConference(conference))
            yield put(ConferenceActions.updateConferenceFetching(false))
            yield put(ConferenceActions.updateConferenceSuccess(true))
        } else {
            console.log(conferenceId)
            yield put(ConferenceActions.updateConferenceFetching(false))
            yield put(ConferenceActions.updateConferenceError(true))
            yield put(ConferenceActions.updateConferenceSuccess(false))
        }
    } catch(e) {
        yield put(ConferenceActions.updateConferenceFetching(false))
        yield put(ConferenceActions.updateConferenceError(true))
        yield put(ConferenceActions.updateConferenceSuccess(false))
        console.log('GetTempConference', e)
    }
}

export function* createNewConference(params) {
    try {
        yield put(ConferenceActions.updateConferenceFetching(true))
        yield put(ConferenceActions.updateConferenceError(false))
        yield put(ConferenceActions.updateConferenceSuccess(false))
        const { conference } = params
        if (conference) {
            const response = yield call(apiFetch, 'conferences', 'post', conference)
            if (response) {
                yield put(ConferenceActions.updateTempConference(conference))
                yield put(ConferenceActions.updateConferenceFetching(false))
                yield put(ConferenceActions.updateConferenceSuccess(true))
            } else {
                yield put(ConferenceActions.updateConferenceFetching(false))
                yield put(ConferenceActions.updateConferenceError(true))
            }
        }
    } catch(e) {
        yield put(ConferenceActions.updateConferenceFetching(false))
        yield put(ConferenceActions.updateConferenceError(true))
        console.log('createNewConference', e)
    }
}

export function* updateExistingConference(params) {
    try {
        yield put(ConferenceActions.updateConferenceFetching(true))
        yield put(ConferenceActions.updateConferenceError(false))
        const { conference } = params
        if (conference && conference.conferenceID) {
            const response = yield call(apiFetch, `conferences/${conference.conferenceID}`, 'put', conference)
            if (response) {
                yield put(ConferenceActions.updateTempConference(conference))
                yield put(ConferenceActions.updateConferenceFetching(false))
            } else {
                yield put(ConferenceActions.updateConferenceFetching(false))
                yield put(ConferenceActions.updateConferenceError(true))
            }
        }
    } catch(e) {
        yield put(ConferenceActions.updateConferenceFetching(false))
        yield put(ConferenceActions.updateConferenceError(true))
        console.log('updateExistingConference', e)
    }
}