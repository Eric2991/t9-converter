import React from 'react'
import { connect } from 'react-redux'
import type { ConverterState } from '../../shared/types'
import './style.scss'

type Props = {
  loading: boolean,
  words: Array<string>
}

const defaultProps: Props = {
  loading: false,
  words: []
}

const WordList = (props: Props = defaultProps) => {
  const { loading, words } = props
  return loading ? (
    <div>Loading!</div>
  ) : (
    <div>{words.length ? words.join(', ') : 'No words found :('}</div>
  )
}

const mapStateToProps = (state: { converter: ConverterState }) => ({
  loading: state.converter.loading,
  words: state.converter.results
})

export default connect(mapStateToProps)(WordList)
