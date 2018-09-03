import React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import { requestConversion } from '../../actions/conversion'
import type {
  ConverterState,
  NumberPadData,
  NumberPadRow,
  NumberPadRowEntry
} from '../../shared/types'
import { NUMBER_PAD_DATA } from '../../shared/constants'
import './style.scss'

type Props = {
  convert: (input: string) => void
}

type State = {
  input: string
}

const renderPad = (
  data: NumberPadData,
  inputChangeCallback: (e: SyntheticEvent<HTMLButtonElement>) => void
) => (
  <div className="numberPad">
    {data.rows.map((row: NumberPadRow, i: number) => {
      const rowSize: number = row.length
      const entryStyle = { width: `${(1 / rowSize) * 100}%` }
      return (
        <div key={i} className="numberPadRow">
          {row.map((entry: NumberPadRowEntry, j: number) => {
            // Since we can pass in either textual subtext or an HTML Char code,
            // we check to see if we should parse a char code
            const subtext = !Number.isNaN(parseInt(entry.subtext, 10))
              ? String.fromCharCode(parseInt(entry.subtext, 10))
              : entry.subtext

            return (
              <button
                key={`${i}-${j}`}
                className="numberPadRowEntry"
                onClick={inputChangeCallback}
                style={entryStyle}
                type="button"
                value={entry.number}
              >
                <div className="numberPadRowEntry-main">{entry.number}</div>
                <div className="numberPadRowEntry-subtext">{subtext}</div>
              </button>
            )
          })}
        </div>
      )
    })}
  </div>
)

class NumberInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.handleBackspace = this.handleBackspace.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      input: ''
    }
  }

  handleBackspace = () => {
    const { input } = this.state
    if (input.length) this.setState({ input: input.slice(0, -1) })
  }

  handleClear = () => {
    this.setState({ input: '' })
  }

  handleInputChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget
    const { input } = this.state
    this.setState({ input: input + value })
  }

  handleSubmit = () => {
    const { convert } = this.props
    const { input } = this.state
    if (input.length) {
      convert(input)
    }
  }

  render() {
    const { input } = this.state
    return (
      <div className="NumberInput">
        <div className="inputDisplay">
          {input.length ? input : 'Enter a number!'}
        </div>
        {renderPad(NUMBER_PAD_DATA, this.handleInputChange)}
        <div className="actionButtons">
          <button type="button" onClick={this.handleClear}>
            Clear
          </button>
          <button
            className="actionButtons-submit"
            type="button"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
          <button type="button" onClick={this.handleBackspace}>
            Backspace
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: { converter: ConverterState }) => ({
  loading: state.converter.loading
})

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  convert: (input: string) => dispatch(requestConversion(input))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberInput)
