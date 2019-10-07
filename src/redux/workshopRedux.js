import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateWorkshopList: ['workshopList'],
    updateWorkshopApplication: ['workshopApplication'],
    updateWorkshop: ['workshop'],
    updateUsers: ['users'],
    getWorkshopList: null,
    getWorkshop: ['id'],
    getUsers: null,
    updateFetching: ['fetching'],
    updateSuccess: ['success'],
    updateError: ['error'],
    createNewWorkshop: ['workshop'],
    updateExistingWorkshop: ['workshop'],
    deleteWorkshop: ['id'],
    uploadWorkshopApplication: ['application'],
    getWorkshopApplication: ['uid'],
})

export const WorkshopTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    workshopList: [],
    workshopApplication: [],
    workshop: null,
    users: [],
    error: false,
    fetching: false,
    success: false,
  })

/* ------------- Reducers ------------- */

export const updateWorkshopList = (state, { workshopList }) => {
  return state.merge({ workshopList })
}

export const updateWorkshop = (state, { workshop }) => {
  return state.merge({ workshop })
}

export const updateUsers = (state, { users }) => {
  return state.merge({ users })
}

export const updateError = (state, { error }) => {
  return state.merge({ error })
}

export const updateFetching = (state, { fetching }) => {
  return state.merge({ fetching })
}

export const updateSuccess = (state, { success }) => {
  return state.merge({ success })
}

export const updateWorkshopApplication = (state, { workshopApplication }) => {
  return state.merge({ workshopApplication })  
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_WORKSHOP_LIST]: updateWorkshopList,
  [Types.UPDATE_WORKSHOP_APPLICATION]: updateWorkshopApplication,
  [Types.UPDATE_WORKSHOP]: updateWorkshop,
  [Types.UPDATE_USERS]: updateUsers,
  [Types.UPDATE_ERROR]: updateError,
  [Types.UPDATE_FETCHING]: updateFetching,
  [Types.UPDATE_SUCCESS]: updateSuccess,
})