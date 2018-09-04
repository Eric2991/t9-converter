import converter from 'reducers/converter'
import type {
  Action,
  AsyncRequestAction,
  AsyncResponseAction,
  ConverterState,
  GenericRequestAction
} from 'shared/types'
import { ACTION_TYPES } from 'shared/constants'

const defaultState: ConverterState = {
  loading: false,
  query: '',
  results: []
}

describe('Converter Reducer', () => {
  describe('default behavior', () => {
    it('returns the initial state when state is not passed and action is not recognized', () => {
      const action: Action = {
        type: 'unknown'
      }
      const resultingState: ConverterState = converter(undefined, action)

      expect(resultingState).toEqual(defaultState)
    })
    it('returns the existing state when a state is passed and action is not recognized', () => {
      const action: Action = {
        type: 'unknown'
      }
      const existingState: ConverterState = {
        ...defaultState,
        loading: true,
        query: '3354'
      }
      const resultingState: ConverterState = converter(existingState, action)

      expect(resultingState).toEqual(existingState)
    })
  })
  describe('Async Request', () => {
    it('sets the proper properties on AsyncRequest with defaultState', () => {
      const expectedQuery = '3354'
      const action: AsyncRequestAction = {
        type: ACTION_TYPES.ASYNC_REQUEST,
        payload: { query: expectedQuery }
      }

      const resultingState: ConverterState = converter(undefined, action)
      const expectedState: ConverterState = {
        ...defaultState,
        loading: true,
        query: expectedQuery
      }

      expect(resultingState).toEqual(expectedState)
    })
    it('sets the proper properties on AsyncRequest with existing state', () => {
      const existingQuery = '1234'
      const expectedQuery = '3354'
      const action: AsyncRequestAction = {
        type: ACTION_TYPES.ASYNC_REQUEST,
        payload: { query: expectedQuery }
      }

      const existingState: ConverterState = {
        ...defaultState,
        query: existingQuery
      }
      const resultingState: ConverterState = converter(existingState, action)
      const expectedState: ConverterState = {
        ...existingState,
        loading: true,
        query: expectedQuery
      }

      expect(resultingState).toEqual(expectedState)
    })
  })
  describe('Async Response', () => {
    it('sets the proper properties on AsyncResponse with defaultState', () => {
      const expectedResults: Array<string> = ['kiwi', 'pear', 'plum']
      const action: AsyncResponseAction = {
        type: ACTION_TYPES.ASYNC_RESPONSE,
        payload: { results: expectedResults }
      }

      const resultingState: ConverterState = converter(undefined, action)
      const expectedState: ConverterState = {
        ...defaultState,
        loading: false,
        results: expectedResults
      }

      expect(resultingState).toEqual(expectedState)
    })
    it('sets the proper properties on AsyncResponse with existing state', () => {
      const existingQuery = '3354'
      const expectedResults: Array<string> = ['deli']
      const action: AsyncResponseAction = {
        type: ACTION_TYPES.ASYNC_RESPONSE,
        payload: { results: expectedResults }
      }

      const existingState: ConverterState = {
        ...defaultState,
        loading: true,
        query: existingQuery
      }
      const resultingState: ConverterState = converter(existingState, action)
      const expectedState: ConverterState = {
        ...existingState,
        loading: false,
        results: expectedResults
      }

      expect(resultingState).toEqual(expectedState)
    })
  })
  describe('Set Query', () => {
    it('sets the query property over the default state', () => {
      const expectedQuery = '3354'
      const action: GenericRequestAction = {
        type: ACTION_TYPES.SET_QUERY,
        payload: { query: expectedQuery }
      }

      const resultingState: ConverterState = converter(undefined, action)
      const expectedState: ConverterState = {
        ...defaultState,
        query: expectedQuery
      }

      expect(resultingState).toEqual(expectedState)
    })
    it('sets the query property over an existing state', () => {
      const existingQuery = '1234'
      const expectedQuery = '3354'
      const action: GenericRequestAction = {
        type: ACTION_TYPES.SET_QUERY,
        payload: { query: expectedQuery }
      }

      const existingState: ConverterState = {
        ...defaultState,
        query: existingQuery
      }
      const resultingState: ConverterState = converter(existingState, action)
      const expectedState: ConverterState = {
        ...existingState,
        query: expectedQuery
      }

      expect(resultingState).toEqual(expectedState)
    })
  })
})
