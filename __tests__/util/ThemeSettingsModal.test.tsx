import { render, screen } from '@testing-library/react-native'
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

  // More tests to test that pressing a button changes the theme in asyncstorage
})