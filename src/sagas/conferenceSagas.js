import { call, put, select } from 'redux-saga/effects'
import ConferenceActions from '../redux/conferenceRedux'
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
            if (!result) {
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