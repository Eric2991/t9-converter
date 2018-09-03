import type { Action, ConverterState } from '../shared/types'
import { ACTION_TYPES } from '../shared/constants'

const defaultState: ConverterState = {
  loading: false,
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
        results: []
      }
    case ACTION_TYPES.ASYNC_RESPONSE:
      return {
        ...state,
        loading: false,
        results: action.payload.results
      }
    default:
      return state
  }
}

export default converter
