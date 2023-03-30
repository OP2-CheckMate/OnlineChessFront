import React from 'react'
import CustomButton from '../../util/CustomButton'
import { fireEvent, render, screen } from '@testing-library/react-native'
import '@testing-library/jest-dom'

describe('<CustomButton />', () => {
  it('renders correctly', () => {
    const onPressDummy = () => {
      return
    }
    render(<CustomButton title='Test Button' onPress={onPressDummy} />)

    const element = screen.getByText('Test Button')
    expect(element).toBeDefined()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    render(<CustomButton title='Test Button' onPress={onPress} />)

    const pressable = screen.getByTestId('custom-button-pressable')
    const text = screen.getByText('Test Button')

    expect(pressable.props.style).toEqual({
      backgroundColor: '#72063c',
      paddingVertical: 12,
      paddingHorizontal: 14
    })

    fireEvent.press(text)
    expect(onPress).toHaveBeenCalled()
  })

  it('disables the button when disabled prop is true', () => {
    const onPress = jest.fn()
    render(<CustomButton title='Test Button' disabled onPress={onPress} />)

    const pressable = screen.getByTestId('custom-button-pressable')
    const text = screen.getByText('Test Button')

    expect(pressable.props.style).toContainEqual({
      backgroundColor: '#9e9e9e',
      paddingVertical: 12,
      paddingHorizontal: 14
    })
    expect(text.props.style).toEqual({
      color: 'rgb(124, 123, 123)',
      fontWeight: 'bold',
      fontSize: 16
    })
  })
})