import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateConferenceList: ['conferenceList'],
  updateConferenceId: ['conferenceId'],
  updateConferenceError: ['error'],
  updateConference: ['conference'],
  getConference: null,
  applyForConference: ['data'],
  updateConferenceFetching: ['fetching'],
  updatePhases: ['data'],
  getApplicationList: null,
  updateApplicationList: ['applicationList']
})

export const ConferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    conferenceList: null,
    conferenceId: null,
    conference: null,
    error: false,
    fetching: false,
    applicationList: [],
  })

/* ------------- Reducers ------------- */

export const updateConferenceList = (state, { conferenceList }) => 
  state.merge({ conferenceList, conferenceId: conferenceList[conferenceList.length -1].conferenceID })

export const updateConferenceId = (state, { conferenceId }) =>
  state.merge({ conferenceId })

export const updateConference = (state, { conference }) =>
  state.merge({ conference })

export const updateConferenceError = (state, { error }) =>
  state.merge({ error })

export const updateConferenceFetching = (state, { fetching }) =>
  state.merge({ fetching })

export const updateApplicationList = (state, { applicationList }) =>
  state.merge({ applicationList })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CONFERENCE_LIST]: updateConferenceList,
  [Types.UPDATE_CONFERENCE_ID]: updateConferenceId,
  [Types.UPDATE_CONFERENCE]: updateConference,
  [Types.UPDATE_CONFERENCE_ERROR]: updateConferenceError,
  [Types.UPDATE_CONFERENCE_FETCHING]: updateConferenceFetching,
  [Types.UPDATE_APPLICATION_LIST]: updateApplicationList,
})