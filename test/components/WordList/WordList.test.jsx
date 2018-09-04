import React from 'react'
import { Props, WordList } from 'components/WordList'
import LoadingSpinner from 'vendor/LoadingSpinner'
import { shallow } from 'enzyme'

describe('WordList', () => {
  it('renders initial component', () => {
    const initialProps: Props = {
      loading: false,
      query: '',
      words: []
    }
    const wordList = shallow(<WordList {...initialProps} />)
    const messageDiv = wordList.find('div:not(.WordList)')

    expect(messageDiv.length).toBe(1)
    expect(messageDiv.text()).toEqual('')
  })
  it('renders component in loading state', () => {
    const initialProps: Props = {
      loading: true,
      query: '3354',
      words: []
    }
    const wordList = shallow(<WordList {...initialProps} />)
    const loadingSpinner = wordList.find(LoadingSpinner)
    const messageDiv = wordList.find('div:not(.WordList)')

    expect(loadingSpinner.length).toBe(1)
    expect(messageDiv.length).toBe(0)
  })
  it('renders component in loaded state', () => {
    const initialProps: Props = {
      loading: false,
      query: '3354',
      words: ['deli']
    }
    const wordList = shallow(<WordList {...initialProps} />)
    const messageDiv = wordList.find('div:not(.WordList)')
    const expectedMessage = 'deli'

    expect(messageDiv.length).toBe(1)
    expect(messageDiv.text()).toBe(expectedMessage)
  })
  it('renders no results found message', () => {
    const initialProps: Props = {
      loading: false,
      query: '1234',
      words: []
    }
    const wordList = shallow(<WordList {...initialProps} />)
    const messageDiv = wordList.find('div:not(.WordList)')
    const expectedMessage = 'No words found :('

    expect(messageDiv.length).toBe(1)
    expect(messageDiv.text()).toBe(expectedMessage)
  })
})
