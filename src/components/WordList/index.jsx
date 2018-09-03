import React from 'react'
import { connect } from 'react-redux'
import type { ConverterState } from '../../shared/types'
import './style.scss'

type Props = {
  loading: boolean,
  query: string,
  words: Array<string>
}

const WordList = (props: Props) => {
  const { loading, query, words } = props
  const resultsMessage = words.length ? words.join(', ') : 'No words found :('
  const message = query.length ? resultsMessage : null
  return (
    <div className="WordList">
      {loading ? <div>Loading!</div> : <div>{message}</div>}
    </div>
  )
}

const mapStateToProps = (state: { converter: ConverterState }) => ({
  loading: state.converter.loading,
  query: state.converter.query,
  words: state.converter.results
})

export default connect(mapStateToProps)(WordList)
