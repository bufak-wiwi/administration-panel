import { call, put, select } from 'redux-saga/effects'
import { apiFetch } from '../utils/functions'

// export function* uploadWorkshopApplication(params) {
//     try {
//         yield put(WorkshopActions.updateFetching(true))
//         yield put(WorkshopActions.updateError(false))
//         yield put(WorkshopActions.updateSuccess(false))

//         const { application } = params;
//         const applicant_UID = yield select(store => store.auth.user.uid)
//         const list = []
//         Object.keys(application).forEach(x => {
//             list.push({ applicant_UID, workshop_ID: application[x].prio1, priority: 1})
//             list.push({ applicant_UID, workshop_ID: application[x].prio2, priority: 2})
//             list.push({ applicant_UID, workshop_ID: application[x].prio3, priority: 3})
//         })
        
//         const response = yield call(apiFetch, 'Workshop_Application', 'post', list)
//         if (response) {
//             yield put(WorkshopActions.updateSuccess(true))
//             yield put(WorkshopActions.updateFetching(false))
//         } else {
//             yield put(WorkshopActions.updateError(true))
//             yield put(WorkshopActions.updateFetching(false))
//         }
//     } catch (e) {
//         console.log('Uploading WS Application', e)
//         yield put(WorkshopActions.updateError(true))
//         yield put(WorkshopActions.updateFetching(false))
//     }
// }

export function* getUserTravelInfos(params) {
    try {
        const { uid } = params;
        const result = yield call(apiFetch, `Travel/peruser/${uid}`, 'get')
        if (result) {
            yield put(getUserTravelInfos(result))
        }
    } catch (e) {
        console.log('Get user travel infos', e)
    }

}