import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateUser: ['user'],
  updateToken: ['token'],
  updateFetching: ['fetching'],
  updateAdmin: ['isAdmin', 'adminForConference'],
  login: ['email', 'password', 'remeberMe'],
  updateError: ['error'],
  logout: ['history'],
  rehydrateState: null,
  resetAuthState: null,
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    user: null,
    token: null,
    isSuperAdmin: false,
    isAddmin: false,
    adminForConference: 0,
    fetching: false,
    error: false
  })

/* ------------- Reducers ------------- */

export const updateToken = (state, { token }) =>
  state.merge({ token })

export const updateAdmin = (state, {admin, adminForConference}) =>
  state.merge({ admin, adminForConference })

export const updateUser = (state, { user }) => 
  state.merge({ user, isSuperAdmin: user.isSuperAdmin })

export const updateFetching = (state, { fetching }) =>{
  return state.merge({ fetching })
}

export const updateError = (state, { error }) => {
  return   state.merge({ error })
}

export const resetAuthState = () => 
  INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_AUTH_STATE]: resetAuthState,
  [Types.UPDATE_TOKEN]: updateToken,
  [Types.UPDATE_USER]: updateUser,
  [Types.UPDATE_ADMIN]: updateAdmin,
  [Types.UPDATE_FETCHING]: updateFetching,
  [Types.UPDATE_ERROR]: updateError
})