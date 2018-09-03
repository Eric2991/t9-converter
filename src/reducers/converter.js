import type { Action, ConverterState } from '../shared/types'
import { ACTION_TYPES } from '../shared/constants'

const defaultState: ConverterState = {
  loading: false,
  query: '',
  results: []
}

const converter = (
  state: ConverterState = defaultState,
  action: Action
): ConverterState => {
  switch (action.type) {
    case ACTION_TYPES.ASYNC_REQUEST:
      return {
        ...state,
        loading: true,
        query: action.payload.query,
        results: []
      }
    case ACTION_TYPES.ASYNC_RESPONSE:
      return {
        ...state,
        loading: false,
        results: action.payload.results
      }
    case ACTION_TYPES.SET_QUERY:
      return {
        ...state,
        query: action.payload.query
      }
    default:
      return state
  }
}

export default converter
