/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fireEvent, within } from '@testing-library/react-native'
import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import Settings from '../../components/Settings'

describe('<Settings />', () => {
  it('renders correctly', () => {
    let renderer: ReactTestRenderer
    act(() => {
      renderer = create(<Settings />)
    })

    const gameplayView = within(renderer!.root)
    expect(gameplayView.getByText('Gameplay')).toBeDefined()

    const themeView = within(renderer!.root)
    expect(themeView.getByText('Theme')).toBeDefined()

    const profileView = within(renderer!.root)
    expect(profileView.getByText('Profile')).toBeDefined()

    renderer!.unmount()
  })

  it('clicking theme button shows theme modal', () => {
    let renderer: ReactTestRenderer
    act(() => {
      renderer = create(<Settings />)
    })
    const view = within(renderer!.root)
    const themeButton = view.getByText('Theme')
    fireEvent.press(themeButton)

    const themeModal = view.getByText('Select Theme')
    expect(themeModal).toBeDefined()

    renderer!.unmount()
  })

  it('clicking profile button shows profile modal', () => {
    let renderer: ReactTestRenderer
    act(() => {
      renderer = create(<Settings />)
    })
    const view = within(renderer!.root)
    const themeButton = view.getByText('Profile')
    fireEvent.press(themeButton)

    const themeModal = view.getByText('Set name')
    expect(themeModal).toBeDefined()

    renderer!.unmount()
  })
})