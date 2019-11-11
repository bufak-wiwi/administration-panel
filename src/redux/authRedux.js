import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // User
  updateUser: ['user'],
  updateToken: ['token'],
  registerUser: ['params'],
  getUser: ['uid'],
  putUser: ['user'],
  updateFetching: ['fetching'],
  updateUserForConference: ['userForConference'],
  login: ['email', 'password', 'remeberMe'],
  updateError: ['error'],
  updateSuccess: ['success'],
  logout: ['history'],
  rehydrateState: null,
  resetAuthState: null,
  resetPassword: ['email'],
  changeEmail: ['newEmail','oldPassword'],
  changePassword: ['oldPassword', 'newPassword'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    user: null,
    token: null,
    isSuperAdmin: false,
    userForConference: [],
    fetching: false,
    error: false,
    success: false
  })

/* ------------- Reducers ------------- */

export const updateToken = (state, { token }) =>
  state.merge({ token })

export const updateUserForConference = (state, { userForConference }) =>
  state.merge({ userForConference })

export const updateUser = (state, { user }) =>
  state.merge({ user, isSuperAdmin: user.isSuperAdmin })

export const updateFetching = (state, { fetching }) =>{
  return state.merge({ fetching })
}

export const updateError = (state, { error }) => {
  return state.merge({ error })
}

export const updateSuccess = (state, { success }) =>
  state.merge({ success })

export const resetAuthState = () => 
  INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_AUTH_STATE]: resetAuthState,
  [Types.UPDATE_TOKEN]: updateToken,
  [Types.UPDATE_USER]: updateUser,
  [Types.UPDATE_USER_FOR_CONFERENCE]: updateUserForConference,
  [Types.UPDATE_FETCHING]: updateFetching,
  [Types.UPDATE_ERROR]: updateError,
  [Types.UPDATE_SUCCESS]: updateSuccess,
})