import React from 'react'
import { Props, NumberInput } from 'components/NumberInput'
import { requestConversion, setQuery } from 'actions/conversion'
import { shallow } from 'enzyme'

const props: Props = {
  convert: requestConversion,
  querySet: setQuery
}

describe('NumberInput', () => {
  it('renders initial component', () => {
    const numberInput = shallow(<NumberInput {...props} />)
    const inputDisplay = numberInput.find('div.inputDisplay')

    expect(inputDisplay.text()).toEqual('Enter a number!')
  })
  it('renders numberPad with correct number of buttons', () => {
    const numberInput = shallow(<NumberInput {...props} />)
    const numberPadRows = numberInput.find('div.numberPad').children()
    const numberPadButtons = numberPadRows.reduce(
      (acc, row) => [...acc, ...row.children()],
      []
    )

    expect(numberPadButtons.length).toEqual(9)
  })
  it('modifies the input when button is clicked', () => {
    const numberInput = shallow(<NumberInput {...props} />)
    const numberPadFourButton = numberInput
      .find('div.numberPadRow')
      .at(1)
      .childAt(0)
    const backspaceButton = numberInput.find('div.actionButtons').childAt(2)
    const clearButton = numberInput.find('div.actionButtons').childAt(0)
    const mockEvent = {
      currentTarget: { value: numberPadFourButton.prop('value') }
    }

    // Input buttons
    numberPadFourButton.simulate('click', mockEvent)
    expect(numberInput.state().input).toEqual('4')
    numberPadFourButton.simulate('click', mockEvent)
    expect(numberInput.state().input).toEqual('44')
    numberPadFourButton.simulate('click', mockEvent)
    expect(numberInput.state().input).toEqual('444')

    // Backspace button
    backspaceButton.simulate('click')
    expect(numberInput.state().input).toEqual('44')

    // Clear button
    clearButton.simulate('click')
    expect(numberInput.state().input).toEqual('')
  })
  it('renders inputDisplay with correct input', () => {
    const numberInput = shallow(<NumberInput {...props} />)
    const numberPadFourButton = numberInput
      .find('div.numberPadRow')
      .at(1)
      .childAt(0)
    const getInputDisplay = numberInputWrapper =>
      numberInputWrapper.update().find('div.inputDisplay')
    const backspaceButton = numberInput.find('div.actionButtons').childAt(2)
    const clearButton = numberInput.find('div.actionButtons').childAt(0)
    const mockEvent = {
      currentTarget: { value: numberPadFourButton.prop('value') }
    }

    // Initial display
    expect(getInputDisplay(numberInput).text()).toEqual('Enter a number!')

    // Input buttons
    numberPadFourButton.simulate('click', mockEvent)
    expect(getInputDisplay(numberInput).text()).toEqual('4')

    numberPadFourButton.simulate('click', mockEvent)
    expect(getInputDisplay(numberInput).text()).toEqual('44')

    numberPadFourButton.simulate('click', mockEvent)
    expect(getInputDisplay(numberInput).text()).toEqual('444')

    // Backspace button
    backspaceButton.simulate('click')
    expect(getInputDisplay(numberInput).text()).toEqual('44')

    // Clear button
    clearButton.simulate('click')
    expect(getInputDisplay(numberInput).text()).toEqual('Enter a number!')
  })
})
