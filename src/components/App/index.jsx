import React from 'react'
import classnames from 'classnames'
import LoadingSpinner from '../../vendor/LoadingSpinner'
import NumberInput from '../NumberInput'
import WordList from '../WordList'
import './style.scss'

type State = {
  isFinishedWithAnimation: boolean,
  isMounted: boolean
}

class App extends React.Component<{}, State> {
  constructor() {
    super()
    this.state = {
      isFinishedWithAnimation: false,
      isMounted: false
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  handleAnimationEnd = () => {
    this.setState({ isFinishedWithAnimation: true })
  }

  render() {
    const { isFinishedWithAnimation, isMounted } = this.state
    return (
      <div className="App">
        {!isFinishedWithAnimation && (
          <div
            className={classnames('splashScreen', isMounted && 'hidden')}
            onAnimationEnd={this.handleAnimationEnd}
          >
            <LoadingSpinner />
          </div>
        )}
        <header>
          <h1>T9 Converter</h1>
          <p>
            Play around with it!
            <span role="img" aria-label="Man Dancing">
              &#x1f57a;
            </span>
          </p>
        </header>
        <WordList />
        <NumberInput />
      </div>
    )
  }
}

export default App
