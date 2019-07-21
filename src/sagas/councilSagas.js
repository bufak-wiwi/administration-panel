import { call, put, select } from 'redux-saga/effects'
import CouncilActions from '../redux/councilRedux'
import { apiFetch } from '../utils/functions'

export function* getCouncil() {
    try {
        const { councilId } = yield select(state => state.council);
        const council = yield call(apiFetch, `councils/${councilId}`, 'get')
        console.log(council);
        yield put(CouncilActions.updateCouncil(council))
    } catch(e) {
        console.log('GetCouncil', e)
    }
}

export function* getCouncilList() {
    try {
        //const {councilList}  = yield select(state => state.councilList);
        const councilList = yield call(apiFetch, 'councils/', 'get')
        yield put(CouncilActions.updateCouncilList(councilList))
    }
    catch(e) {
        console.log('GetCouncilList', e)
    }
}

// export function* applyForCouncil(action) {
//     try {
//         yield put(CouncilActions.updateCouncilFetching(true))
//         yield put(CouncilActions.updateCouncilError(false))
//         const { data } = action
//         if ( data ) {
//             const result = yield call(apiFetch, 'Council_Application', 'post', data)
//             if (!result) {
//                 yield put(CouncilActions.updateCouncilError(true))
//             } 
//             yield put(CouncilActions.updateCouncilFetching(false))
//         }
//     } catch(e) {
//         yield put(CouncilActions.updateCouncilFetching(false))
//         yield put(CouncilActions.updateCouncilError(true))
//         console.log('ApplyForCouncil', e)
//     }
// }