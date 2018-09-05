import * as actions from 'actions/conversion'
import { ACTION_TYPES } from 'shared/constants'
import type { AsyncResponseAction, ConverterState } from 'shared/types'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

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

  describe('requestConversion', () => {
    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })

    it('returns an AsyncRequestAction and an AsyncRequestResponse once fetching is completed', () => {
      const query: string = '3354'

      fetchMock.getOnce(`express:/api/convert/:digits`, 200)

      const expectedActions = [
        { type: ACTION_TYPES.ASYNC_REQUEST, payload: { query } },
        { type: ACTION_TYPES.ASYNC_RESPONSE, payload: { results: ['deli'] } }
      ]
      const initialConverterState: ConverterState = {
        loading: false,
        query: '',
        results: []
      }
      const store = mockStore({ converter: initialConverterState })

      return store.dispatch(actions.requestConversion(query, true)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
