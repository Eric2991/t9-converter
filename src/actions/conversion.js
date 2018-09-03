import type { Dispatch } from 'redux'
import fetch from 'isomorphic-fetch'
import type { AsyncRequestAction, AsyncResponseAction } from '../shared/types'
import { ACTION_TYPES } from '../shared/constants'

require('es6-promise').polyfill()

export const setQuery = (input: string) => ({
  type: ACTION_TYPES.SET_QUERY,
  payload: { query: input }
})

export const receiveConversion = (
  payload: Array<string>
): AsyncResponseAction => ({
  type: ACTION_TYPES.ASYNC_RESPONSE,
  payload: { results: payload }
})

const setConversionRequest = (input: string): AsyncRequestAction => ({
  type: ACTION_TYPES.ASYNC_REQUEST,
  payload: { query: input }
})

export const requestConversion = (
  input: string
): ((
  dispatch: Dispatch<*>
) => Promise<AsyncResponseAction | AsyncRequestAction>) => (
  dispatch: Dispatch<*>
) => {
  dispatch(setConversionRequest(input))
  return fetch(`/api/convert/${input}`)
    .then((response: Response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    })
    .then((results: Array<string>) => dispatch(receiveConversion(results)))
}
