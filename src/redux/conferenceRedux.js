import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateConferenceList: ['conferenceList'],
  updateConferenceId: ['conferenceId'],
  updateError: ['error']
})

export const ConferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    conferenceList: null,
    conferenceId: null,
    error: false
  })

/* ------------- Reducers ------------- */

export const updateConferenceList = (state, { conferenceList }) => 
  state.merge({ conferenceList, conferenceId: conferenceList[conferenceList.length -1].conferenceID })

export const updateConferenceId = (state, { conferenceId }) =>
  state.merge({ conferenceId })

export const updateError = (state, { error }) =>
  state.merge({ error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CONFERENCE_LIST]: updateConferenceList,
  [Types.UPDATE_CONFERENCE_ID]: updateConferenceId,
  [Types.UPDATE_ERROR]: updateError
})