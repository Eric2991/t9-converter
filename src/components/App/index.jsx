import React from 'react'
import NumberInput from '../NumberInput'
import WordList from '../WordList'
import './style.scss'

const App = () => (
  <div className="App">
    <header>
      <h1>T9 Converter</h1>
      <p>Play around with it!</p>
    </header>
    <WordList />
    <NumberInput />
  </div>
)

export default App
