import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateCouncilList: ['councilList'],
  updateCouncilId: ['councilId'],
  updateCouncilError: ['error'],
  updateCouncil: ['council'],
  getCouncil: null,
  getCouncilList: null,
  applyForCouncil: ['data'],
  updateCouncilFetching: ['fetching'],
})

export const CouncilTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    councilList: [],
    councilId: null,
    council: null,
    error: false,
    fetching: false,
  })

/* ------------- Reducers ------------- */

export const updateCouncilList = (state, { councilList }) => {
  return state.merge({ councilList })
}

export const updateCouncilId = (state, { councilId }) =>
  state.merge({ councilId })

export const updateCouncil = (state, { council }) =>
  state.merge({ council })

export const updateCouncilError = (state, { error }) =>
  state.merge({ error })

export const updateCouncilFetching = (state, { fetching }) =>
  state.merge({ fetching })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_COUNCIL_LIST]: updateCouncilList,
  [Types.UPDATE_COUNCIL_ID]: updateCouncilId,
  [Types.UPDATE_COUNCIL]: updateCouncil,
  [Types.UPDATE_COUNCIL_ERROR]: updateCouncilError,
  [Types.UPDATE_COUNCIL_FETCHING]: updateCouncilFetching,
})