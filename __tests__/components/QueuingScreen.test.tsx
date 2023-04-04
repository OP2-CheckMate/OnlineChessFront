import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import QueuingScreen from '../../components/QueuingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

const mockedCanGoBack = jest.fn().mockReturnValue(true)
const mockedGoBack = jest.fn()
const mockedNavigation = { canGoBack: mockedCanGoBack, goBack: mockedGoBack }
const disabledBtn = {
  backgroundColor: '#9e9e9e',
  paddingVertical: 12,
  paddingHorizontal: 14
}
const enabledBtn = {
  backgroundColor: '#72063c',
  paddingVertical: 12,
  paddingHorizontal: 14
}

describe('<QueuingSCreen />', () => {
  it('renders correctly with buttons disabled by default', () => {
    render(
      <QueuingScreen navigation={mockedNavigation as any} />
    )
    const buttons = screen.getAllByTestId('custom-button-pressable')
    buttons.forEach(button => expect(button.props.style).toContainEqual(disabledBtn))

    const nameInput = screen.getByPlaceholderText('Enter your name')
    expect(nameInput).toBeDefined()

    const createGameButton = screen.getByText('Create Game')
    expect(createGameButton).toBeDefined()

    const findGameButton = screen.getByText('Find game')
    expect(findGameButton).toBeDefined()

    const lobbyInput = screen.getByPlaceholderText('Enter Lobby-Id')
    expect(lobbyInput).toBeDefined()

    const joinGameButton = screen.getByText('Join Game')
    expect(joinGameButton).toBeDefined()
  })

  it('inputting name enables Create Game and Find game buttons by saving name to asyncstorage', async () => {
    render(
      <QueuingScreen navigation={mockedNavigation as any} />
    )
    const nameInput = await waitFor(() => screen.getByPlaceholderText('Enter your name'))
    fireEvent.changeText(nameInput, 'tester')

    const createGameButton = screen.getByText('Create Game')
    expect(createGameButton.parent.parent.props.style).toEqual(enabledBtn)

    const findGameButton = screen.getByText('Find game')
    expect(findGameButton.parent.parent.props.style).toEqual(enabledBtn)

    // const findGameButton = screen.getByText('Find game')

    const name = await AsyncStorage.getItem('playerName')
    expect(name).toEqual('tester')
  })

  it('inputting lobby code enables Join Game button', async () => {
    render(
      <QueuingScreen navigation={mockedNavigation as any} />
    )
    const lobbyInput = await waitFor(() => screen.getByPlaceholderText('Enter Lobby-Id'))
    fireEvent.changeText(lobbyInput, '1001')

    const joinGameButton = screen.getByText('Join Game')
    expect(joinGameButton.parent.parent.props.style).toEqual(enabledBtn)
  })
})