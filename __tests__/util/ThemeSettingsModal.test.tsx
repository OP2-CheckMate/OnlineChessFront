import { fireEvent, render, screen } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import ThemeSettingsModal from '../../util/ThemeSettingsModal'

describe('<ThemeSettingsModal />', () => {
  it('renders correctly', () => {
    const handleClose = () => { return }
    render(
      <ThemeSettingsModal
        isVisible={true}
        closeModal={handleClose}
      />
    )
    const element = screen.findByText('Select Theme')
    expect(element).toBeDefined()
  })

  it('changes the theme stored in asyncstorage', async () => {
    const handleClose = () => { return }
    await AsyncStorage.setItem('theme', '0')
    render(
      <ThemeSettingsModal
        isVisible={true}
        closeModal={handleClose}
      />
    )
    const element = screen.getByText('Swe')
    fireEvent.press(element)

    const newTheme = await AsyncStorage.getItem('theme')
    expect(newTheme).toBe('2')
    await AsyncStorage.clear()
  })
})