import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/**
 * Sort the conferences first based on whether the end of the conference is still in the future and then descending from the start date
 * @param {*} conferenceList unsorted array of conferences
 * @return sorted array based on date, so that the last conference will always be the latest
 */
export const sortedConferenceList = (conferenceList) =>  conferenceList.sort((a,b) => {
  const today = new Date().setHours(0,0,0,)
    var endA = (new Date(a.dateEnd) - today) > -1
    var endB = (new Date(b.dateEnd) - today) > -1
    if (endA > endB) return 1
    if (endA < endB) return -1
    return new Date(b.dateStart) - new Date(a.dateStart)
})

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateConferenceList: ['conferenceList'],
  getConferenceList: null,
  updateConferenceId: ['conferenceId'],
  updateConferenceError: ['error'],
  updateConferenceSuccess: ['success'],
  updateConference: ['conference'],
  getConference: null,
  applyForConference: ['data'],
  updateConferenceFetching: ['fetching'],
  updatePhases: ['data'],
  updateIsPasswordValid: ['isPasswordValid', 'priority', 'isOtherKey'],
  checkPassword: ['password'],
  getApplicationList: null,
  updateApplicationList: ['applicationList'],
  uploadApplicationStatusChange: ['data'],
  getApplication: ['uid'],
  updateApplication: ['application'],
  uploadApplication: ['application'],
  updatePassword: ['password'],
  generateAuthenticationKeys: ['otherKeysCount'],
  updatePasswordList: ['passwordList'],
  getPasswordList: null,
  getBadgeList: null,
  updateBadgeList: ['badgeList'],
  resetConferenceState: null,
  // superAdmin
  getTempConference: ['conferenceId'],
  updateTempConference: ['tempConference'],
  updateExistingConference: ['conference'],
  createNewConference: ['conference'],
})

export const ConferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    conferenceList: null,
    conferenceId: null,
    conference: null,
    error: false,
    success: false,
    fetching: false,
    applicationList: [],
    application: null,
    // password protection
    password: '',
    passwordList: [],
    isPasswordValid: false,
    priority: 0,
    isOtherKey: false,
    // badge
    badgeList: [],
    // superAdmin
    tempConference: null,
  })

/* ------------- Reducers ------------- */

export const updateConferenceList = (state, { conferenceList }) => 
  state.merge({ conferenceList, conferenceId: sortedConferenceList(conferenceList)[conferenceList.length -1].conferenceID })

export const updateConferenceId = (state, { conferenceId }) =>
  state.merge({ conferenceId })

export const updateConference = (state, { conference }) =>
  state.merge({ conference })

export const updateConferenceError = (state, { error }) =>
  state.merge({ error })

export const updateConferenceSuccess = (state, { success }) =>
  state.merge({ success })

export const updateConferenceFetching = (state, { fetching }) =>
  state.merge({ fetching })

export const updateIsPasswordValid = (state, { isPasswordValid, priority, isOtherKey }) =>
  state.merge({ isPasswordValid, priority, isOtherKey })

export const updateApplicationList = (state, { applicationList }) =>
  state.merge({ applicationList })

export const updateApplication = (state, { application }) =>
  state.merge({ application })

export const updatePassword = (state, { password }) =>
  state.merge({ password })

export const updateTempConference = (state, { tempConference }) =>
  state.merge({ tempConference })
  
export const updatePasswordList = (state, { passwordList }) =>
  state.merge({ passwordList })

export const updateBadgeList = (state, { badgeList }) =>
  state.merge({ badgeList })

export const resetConferenceState = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CONFERENCE_LIST]: updateConferenceList,
  [Types.UPDATE_CONFERENCE_ID]: updateConferenceId,
  [Types.UPDATE_CONFERENCE]: updateConference,
  [Types.UPDATE_CONFERENCE_ERROR]: updateConferenceError,
  [Types.UPDATE_CONFERENCE_SUCCESS]: updateConferenceSuccess,
  [Types.UPDATE_CONFERENCE_FETCHING]: updateConferenceFetching,
  [Types.UPDATE_IS_PASSWORD_VALID]: updateIsPasswordValid,
  [Types.UPDATE_APPLICATION_LIST]: updateApplicationList,
  [Types.UPDATE_APPLICATION]: updateApplication,
  [Types.UPDATE_PASSWORD]: updatePassword,
  [Types.UPDATE_TEMP_CONFERENCE]: updateTempConference,
  [Types.UPDATE_PASSWORD_LIST]: updatePasswordList,
  [Types.UPDATE_BADGE_LIST]: updateBadgeList,
  [Types.RESET_CONFERENCE_STATE]: resetConferenceState,
})