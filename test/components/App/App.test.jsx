import React from 'react'
import App from 'components/App'
import LoadingSpinner from 'vendor/LoadingSpinner'
import NumberInput from 'components/NumberInput'
import { shallow } from 'enzyme'
import WordList from 'components/WordList'

describe('App', () => {
  it('renders loading state before componentMount', () => {
    const app = shallow(<App />, { disableLifecycleMethods: true })
    const splashScreen = app.find('div.splashScreen')

    expect(splashScreen.hasClass('hidden')).toEqual(false)
    expect(splashScreen.find(LoadingSpinner).length).toEqual(1)
  })
  it('renders animating state after componentMount', () => {
    const app = shallow(<App />)
    const splashScreen = app.find('div.splashScreen')

    expect(splashScreen.hasClass('hidden')).toEqual(true)
    expect(splashScreen.find(LoadingSpinner).length).toEqual(1)
  })
  it('removes splashScreen after animation finishes', async () => {
    const app = shallow(<App />)
    app.setState({ isFinishedWithAnimation: true })

    expect(app.exists('div.splashScreen')).toEqual(false)
  })
  it('renders child components before componentMount', () => {
    const app = shallow(<App />, { disableLifecycleMethods: true })

    expect(app.find(WordList).exists()).toEqual(true)
    expect(app.find(NumberInput).exists()).toEqual(true)
  })
  it('renders child components after componentMount', () => {
    const app = shallow(<App />)

    expect(app.find(WordList).exists()).toEqual(true)
    expect(app.find(NumberInput).exists()).toEqual(true)
  })
})
