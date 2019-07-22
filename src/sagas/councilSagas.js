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