import { call, put, select } from 'redux-saga/effects'
import WorkshopActions from '../redux/workshopRedux'
import { apiFetch } from '../utils/functions'

export function* getWorkshopList() {
    try {
        const workshopList = yield call(apiFetch, 'workshops/', 'get')
        yield put(WorkshopActions.updateWorkshopList(workshopList))
    }
    catch(e) {
        console.log('GetWorkshopList', e)
    }
}

export function* getWorkshop(params) {
    try {
        yield put(WorkshopActions.updateError(false))
        const { id } = params;
        const workshop = yield call(apiFetch, `workshops/${id}`, 'get');
        if (workshop) {
            yield put(WorkshopActions.updateWorkshop(workshop))
        } else {
            yield put(WorkshopActions.updateError(true))
        }
    }
    catch(e) {
        console.log('getWorkshop', e)
        yield put(WorkshopActions.updateError(true))
    }
}

export function* createNewWorkshop(params) {
    try {
        yield put(WorkshopActions.updateFetching(true))
        yield put(WorkshopActions.updateError(false))
        yield put(WorkshopActions.updateSuccess(false))
        var { workshop } = params;
        workshop.conferenceID = yield select(state => state.conference.conferenceId);
        const result = yield call(apiFetch, 'workshops/', 'post', workshop)
        if (result) {
            yield put(WorkshopActions.updateFetching(false))
            yield put(WorkshopActions.updateSuccess(true))
            alert('Workshop wurde erfolgreich hochgeladen')
        } else {
            yield put(WorkshopActions.updateError(true))
            yield put(WorkshopActions.updateFetching(false))
        }
    } catch(e) {
        console.log('updateWorkshop', e)
        yield put(WorkshopActions.updateError(true))
        yield put(WorkshopActions.updateFetching(false))
    }
}

export function* updateExistingWorkshop(params) {
    try {
        yield put(WorkshopActions.updateFetching(true))
        yield put(WorkshopActions.updateError(false))
        yield put(WorkshopActions.updateSuccess(false))
        var { workshop } = params;
        const result = yield call(apiFetch, `workshops/${workshop.workshopID}`, 'put', workshop)
        if (result) {
            yield put(WorkshopActions.updateFetching(false))
            yield put(WorkshopActions.updateSuccess(true))
        } else {
            yield put(WorkshopActions.updateError(true))
            yield put(WorkshopActions.updateFetching(false))
        }
    } catch(e) {
        console.log('updateWorkshop', e)
        yield put(WorkshopActions.updateError(true))
        yield put(WorkshopActions.updateFetching(false))
    }
}

export function* getUsers() {
    try {
        const conferenceId = yield select(state => state.conference.conferenceId);
        const users = yield call(apiFetch, `users/byconference/${conferenceId}`, 'get');
        if (users) {
            yield put(WorkshopActions.updateUsers(users))
        }
    } catch(e) {
        console.log('GetUser', e)
    }
}

export function* deleteWorkshop(params) {
    try {
        const { id } = params;
        yield call(apiFetch, `workshops/${id}`, 'delete')
    } catch (e) {
        console.log('Deleting Workshop:', e)
    }
}

export function* uploadWorkshopApplication(params) {
    try {
        yield put(WorkshopActions.updateFetching(true))
        yield put(WorkshopActions.updateError(false))
        yield put(WorkshopActions.updateSuccess(false))

        const { application } = params;
        const applicant_UID = yield select(store => store.auth.user.uid)
        const list = []
        Object.keys(application).forEach(x => {
            list.push({ applicant_UID, workshop_ID: application[x].prio1, priority: 1})
            list.push({ applicant_UID, workshop_ID: application[x].prio2, priority: 2})
            list.push({ applicant_UID, workshop_ID: application[x].prio3, priority: 3})
        })
        
        const response = yield call(apiFetch, 'Workshop_Application', 'post', list)
        if (response) {
            yield put(WorkshopActions.updateSuccess(true))
            yield put(WorkshopActions.updateFetching(false))
        } else {
            yield put(WorkshopActions.updateError(true))
            yield put(WorkshopActions.updateFetching(false))
        }
    } catch (e) {
        console.log('Uploading WS Application', e)
        yield put(WorkshopActions.updateError(true))
        yield put(WorkshopActions.updateFetching(false))
    }
}