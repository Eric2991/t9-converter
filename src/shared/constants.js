import type { NumberPadData } from './types'

export const ACTION_TYPES = {
  ASYNC_REQUEST: 'ASYNC_REQUEST',
  ASYNC_RESPONSE: 'ASYNC_RESPONSE',
  SET_QUERY: 'SET_QUERY'
}

export const NUMBER_PAD_DATA: NumberPadData = {
  rows: [
    [
      { number: 1, subtext: '9743' },
      { number: 2, subtext: 'abc' },
      { number: 3, subtext: 'def' }
    ],
    [
      { number: 4, subtext: 'ghi' },
      { number: 5, subtext: 'jkl' },
      { number: 6, subtext: 'mno' }
    ],
    [
      { number: 7, subtext: 'pqrs' },
      { number: 8, subtext: 'tuv' },
      { number: 9, subtext: 'wxyz' }
    ]
  ]
}
