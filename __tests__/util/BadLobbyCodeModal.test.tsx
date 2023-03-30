import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import BadLobbyCodeModal from '../../util/BadLobbyCodeModal'

describe('<BadLobbyCodeModal />', () => {
  it('renders correctly when visible', () => {
    const toggle = () => { return }
    render(<BadLobbyCodeModal modalVisible={true} toggleModal={toggle} />)

    const element = screen.getByText('Lobby does not exist')
    expect(element).toBeDefined()
  })
  it('doesnt show when not visible', () => {
    const toggle = () => { return }
    render(<BadLobbyCodeModal modalVisible={false} toggleModal={toggle} />)

    const element = screen.queryByText('Lobby does not exist')
    expect(element).toBeNull()
  })
  // it('calls toggleModal when button is pressed', () => {
  //   const toggle = jest.fn()
  //   render(<BadLobbyCodeModal modalVisible={true} toggleModal={toggle} />)
  // const element = screen.getByDisplayValue('OK')
  // console.log(element)
  // fireEvent.press(button)

  // expect(toggle).toHaveBeenCalled()
  //   })
})