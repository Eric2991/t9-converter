import React from 'react'
import NumberInput from '../NumberInput'
import WordList from '../WordList'
import './style.scss'

const App = () => (
  <div className="App">
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

export default App
