import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getQuestionList: null,
  updateQuestionList: ['questionList'],
  getOpenQuestionList: null,
  updateOpenQuestionList: ['openQuestionList'],
  getMajorityList: null,
  updateMajorityList: ['majorityList'],
  getAnswerList: ['id'],
  updateAnswerList: ['answerList'],
  getQuestion: ['id'],
  updateQuestion: ['question'],
  updateSuccess: ['success'],
  updateError: ['error'],
  updateFetching: ['fetching'],
  updateVoteSuccess: ['voteSuccess'],
  updateVoteError: ['voteError'],
  updateVoteFetching: ['voteFetching'],
  createNewQuestion: ['question'],
  updateExistingQuestion: ['question'],
  deleteQuestion: ['id'],
  postVote: ['vote', 'questionID'],
  closeQuestion: ['id'],
})

export const VotingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
   questionList: [],
   openQuestionList: [],
   majorityList: [],
   answerList: [],
   question: null,
   error: false,
   success: false,
   fetching: false,
   voteError: false,
   voteSuccess: false,
   voteFetching: false,
})

/* ------------- Reducers ------------- */

export const updateQuestionList = (state, { questionList }) => {
  return state.merge({ questionList })
}

export const updateOpenQuestionList = (state, { openQuestionList }) => {
  return state.merge({ openQuestionList })
}

export const updateMajorityList = (state, { majorityList }) => {
  return state.merge({ majorityList })
}

export const updateAnswerList = (state, { answerList }) => {
  return state.merge({ answerList })
}

export const updateQuestion = (state, { question }) => {
  return state.merge({ question })
}

export const updateError = (state, { error }) => {
  return state.merge({ error })
}
export const updateSuccess = (state, { success }) => {
  return state.merge({ success })
}

export const updateFetching = (state, { fetching }) => {
  return state.merge({ fetching })
}

export const updateVoteError = (state, { voteError }) => {
  return state.merge({ voteError })
}
export const updateVoteSuccess = (state, { voteSuccess }) => {
  return state.merge({ voteSuccess })
}

export const updateVoteFetching = (state, { voteFetching }) => {
  return state.merge({ voteFetching })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_QUESTION_LIST]: updateQuestionList,
  [Types.UPDATE_OPEN_QUESTION_LIST]: updateOpenQuestionList,
  [Types.UPDATE_QUESTION]: updateQuestion,
  [Types.UPDATE_SUCCESS]: updateSuccess,
  [Types.UPDATE_ERROR]: updateError,
  [Types.UPDATE_FETCHING]: updateFetching,
  [Types.UPDATE_VOTE_SUCCESS]: updateVoteSuccess,
  [Types.UPDATE_VOTE_ERROR]: updateVoteError,
  [Types.UPDATE_VOTE_FETCHING]: updateVoteFetching,
  [Types.UPDATE_MAJORITY_LIST]: updateMajorityList,
  [Types.UPDATE_ANSWER_LIST]: updateAnswerList,
})