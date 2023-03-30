import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, render, screen } from '@testing-library/react-native'
import React from 'react'
import ProfileSettingsModal from '../../util/ProfileSettingsModal'


describe('<ProfileSettingsModal />', () => {
  it('renders correctly', () => {
    const closeModal = () => { return }

    render(
      <ProfileSettingsModal
        isVisible={true}
        closeModal={closeModal}
      />
    )
    const element = screen.getByText('Set name')
    expect(element).toBeDefined()
  })

  it('renders "Change name" if player already has a name saved', async () => {
    const closeModal = () => { return }
    await AsyncStorage.setItem('playerName', 'Tester')

    render(
      <ProfileSettingsModal
        isVisible={true}
        closeModal={closeModal}
      />
    )

    // Give useEffect some time to get playerName from AsyncStorage and view to load
    await act(async () => {
      setTimeout(() => {
        return
      }, 1000)
    })

    const element = screen.getByText('Change name')
    expect(element).toBeDefined()
    await AsyncStorage.clear()
  })
})