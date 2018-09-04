import * as actions from 'actions/conversion'
import { ACTION_TYPES } from 'shared/constants'
import type { AsyncRequestAction, AsyncResponseAction } from 'shared/types'

const mockFetch = (results: Array<string>) => {
  jest.fn().mockImplementation(() => Promise.resolve(results))
}

describe('actions', () => {
  describe('setQuery', () => {
    it('returns a SET_QUERY action with an input as the payload', () => {
      const expectedInput = '3354'
      const expectedAction = {
        type: ACTION_TYPES.SET_QUERY,
        payload: { query: expectedInput }
      }
      const result = actions.setQuery(expectedInput)

      expect(result).toEqual(expectedAction)
    })
  })

  describe('receiveConversion', () => {
    it('returns an AsyncResponseAction successfully', () => {
      const expectedResults: Array<string> = ['apple', 'pear', 'plum']
      const expectedAction: AsyncResponseAction = {
        type: ACTION_TYPES.ASYNC_RESPONSE,
        payload: { results: expectedResults }
      }
      const result: AsyncResponseAction = actions.receiveConversion(
        expectedResults
      )

      expect(result).toEqual(expectedAction)
    })
  })

  // TO-DO: Implement Jest tests for requestConversion
  // describe('requestConversion', () => {
  // })
})
