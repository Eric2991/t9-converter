import React from 'react'
import { hot } from 'react-hot-loader'
import NumberInput from '../NumberInput'
import WordList from '../WordList'
import './style.scss'

type Props = {}

class App extends React.Component<Props> {
  render() {
    return (
      <div className="App">
        <header>
          <h1>T9 Converter</h1>
          <p>Play around with it!</p>
        </header>
        <WordList />
        <NumberInput />
      </div>
    )
  }
}

export default hot(module)(App)
