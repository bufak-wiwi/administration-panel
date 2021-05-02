import { call, put, select } from 'redux-saga/effects'
import VotingActions from '../redux/votingRedux'
import { apiFetch } from '../utils/functions'

export function* getQuestionList() {
    try {
        yield put(VotingActions.updateFetching(true))
        const conferenceId = yield select(state => state.conference.conferenceId);
        const questionList = yield call(apiFetch, `VotingQuestions/byConference/${conferenceId}`, 'get')
        yield put(VotingActions.updateQuestionList(questionList))
        yield put(VotingActions.updateFetching(false))
    }
    catch(e) {
        yield put(VotingActions.updateFetching(false))
        console.log('GetQuestionList', e)
    }
}

export function* getOpenQuestionList() {
    try {
        yield put(VotingActions.updateFetching(true))
        yield put(VotingActions.updateError(false))
        const conferenceId = yield select(state => state.conference.conferenceId);
        const questionList = yield call(apiFetch, `VotingQuestions/byConference/${conferenceId}`, 'get')
        if (questionList) {
            yield put(VotingActions.updateOpenQuestionList(questionList.filter(x => x.isOpen).sort((a,b) => b.questionID - a.questionID)))
        } else {
            yield put(VotingActions.updateError(true))
        }
        yield put(VotingActions.updateFetching(false))
    }
    catch(e) {
        yield put(VotingActions.updateError(true))
        yield put(VotingActions.updateFetching(false))
        console.log('GetOpenQuestionList', e)
    }
}    

export function* getMajorityList() {
    try {
        const majorityList = yield call(apiFetch, 'VotingMajorities', 'get')
        yield put(VotingActions.updateMajorityList(majorityList))
    }
    catch(e) {
        console.log('GetMajorityList', e)
    }
}

export function* getAnswerList(params) {
    try {
        const { id } = params;
        const answerList = yield call(apiFetch, `VotingAnswers/byQuestion/${id}`, 'get')
        yield put(VotingActions.updateMajorityList(answerList))
    }
    catch(e) {
        console.log('GetAnswerList', e)
    }
}

export function* getQuestion(params) {
    try {
        yield put(VotingActions.updateFetching(true))
        yield put(VotingActions.updateError(false))
        const { id } = params;
        const question = yield call(apiFetch, `VotingQuestions/${id}`, 'get');
        if (question) {
            yield put(VotingActions.updateQuestion(question))
        } else {
            yield put(VotingActions.updateQuestion(null))
            yield put(VotingActions.updateError(true))
        }
        yield put(VotingActions.updateFetching(false))
    }
    catch(e) {
        console.log('getQuestion', e)
        yield put(VotingActions.updateError(true))
        yield put(VotingActions.updateFetching(false))
    }
}

export function* createNewQuestion(params) {
    try {
        yield put(VotingActions.updateSuccess(false))
        yield put(VotingActions.updateError(false))
        yield put(VotingActions.updateFetching(true))
        const { question } = params;
        question.conferenceID = yield select(state => state.conference.conferenceId)
        const result = yield call(apiFetch, 'votingQuestions/', 'post', question)
        if (result) {
            yield put(VotingActions.updateSuccess(true))
        } else {
            yield put(VotingActions.updateError(true))
        }
        yield put(VotingActions.updateFetching(false))
    } catch (e) {
        console.log('createNewWorkshop', e)
        yield put(VotingActions.updateError(true))
        yield put(VotingActions.updateFetching(false))
    }
}

export function* updateExistingQuestion(params) {
    try {
        yield put(VotingActions.updateSuccess(false))
        yield put(VotingActions.updateError(false))
        yield put(VotingActions.updateFetching(true))
        const { question } = params;
        const result = yield call(apiFetch, `votingQuestions/${question.questionID}`, 'put', question)
        if (result) {
            yield put(VotingActions.updateSuccess(true))
            yield call(getQuestionList)
        } else {
            yield put(VotingActions.updateError(true))
        }
        yield put(VotingActions.updateFetching(false))
    } catch (e) {
        console.log('updateExistingQuestion', e)
        yield put(VotingActions.updateError(true))
        yield put(VotingActions.updateFetching(false))
    }
}

export function* closeQuestion(params) {
    try {
        yield put(VotingActions.updateError(false))
        yield put(VotingActions.updateFetching(true))
        const { id } = params;
        const question = yield call(apiFetch, `votingQuestions/closeQuestion/${id}`, 'post', {})
        if (question) {
            yield put(VotingActions.updateQuestion(question))
            yield call(getQuestionList)
        } else {
            yield put(VotingActions.updateError(true))
        }
        yield put(VotingActions.updateFetching(false))
    } catch (e) {
        console.log('updateExistingQuestion', e)
        yield put(VotingActions.updateError(true))
        yield put(VotingActions.updateFetching(false))
    }
}

export function* deleteQuestion(params) {
    try {
        const { id } = params;
        yield call(apiFetch, `votingQuestions/${id}`, 'delete')
    } catch (e) {
        console.log('Deleting Question:', e)
    }
}

export function* postVote(params) {
    try {
        yield put(VotingActions.updateVoteSuccess(false))
        yield put(VotingActions.updateVoteError(false))
        yield put(VotingActions.updateVoteFetching(true))
        const { vote, questionID } = params;
        const result = yield call(apiFetch, 'votingAnswers', 'post', { vote, questionID})

        if (result) {
            const question = yield select(state => state.voting.question)
            if (question) {
                yield put(VotingActions.updateQuestion({...question, councilAnswer: result}))
            }
            yield put(VotingActions.updateVoteSuccess(true))
        } else {
            yield put(VotingActions.updateVoteError(true))
        }
        yield call(getQuestion, { id: questionID })
        yield put(VotingActions.updateVoteFetching(false))
    } catch (e) {
        console.log("Posting Vote:", e)
        yield put(VotingActions.updateVoteError(true))
        yield put(VotingActions.updateVoteFetching(false))
    }
}