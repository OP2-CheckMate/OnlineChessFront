import AsyncStorage from '@react-native-async-storage/async-storage'
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'
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

    const element = await waitFor(() => screen.getByText('Change name'))
    expect(element).toBeDefined()
    await AsyncStorage.clear()
  })

  it('changes the name in asyncstorage', async () => {
    const closeModal = () => { return }
    await AsyncStorage.setItem('playerName', 'Tester')

    render(
      <ProfileSettingsModal
        isVisible={true}
        closeModal={closeModal}
      />
    )

    const input = await waitFor(() => screen.getByTestId('input'))
    fireEvent.changeText(input, 'tester')

    const newName = await AsyncStorage.getItem('playerName')
    expect(newName).toEqual('tester')
    await AsyncStorage.clear()
  })
})