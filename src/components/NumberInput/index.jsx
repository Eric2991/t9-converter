import React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import { requestConversion } from '../../actions/conversion'
import type { ConverterState } from '../../shared/types'

type Props = {
  convert: (input: string) => void
}

type State = {
  input: string
}

class NumberInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      input: ''
    }
  }

  handleInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value })
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
      <div>
        <div className="inputDisplay">{input}</div>
        <div className="numberPad">
          <input type="number" onChange={this.handleInputChange} />
          <button type="button" onClick={this.handleSubmit}>
            Submit
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
