import { render, screen } from '@testing-library/react-native'
import React from 'react'
import { CheckmateModal, DrawModal, StalemateModal } from '../../util/GameOverModal'

describe('GameOverModal', () => {
  describe('CheckmateModal', () => {
    it('renders correctly with player name', () => {
      const playerName = 'Tester'
      // Dummies for testing the component rendering
      const toggle = () => { }
      const navigation = () => { }
      render(
        <CheckmateModal
          modalVisible={true}
          toggleModal={toggle}
          name={playerName}
          navigation={navigation}
        />
      )
      const gameOver = screen.getByText('Game Over!')
      expect(gameOver).toBeDefined()

      const winnerName = screen.getByText(`${playerName} won!`)
      expect(winnerName).toBeDefined()
    })

    it('doesnt show when not visible', () => {
      // Dummies for testing the component rendering
      const toggle = () => { }
      const navigation = () => { }
      render(
        <CheckmateModal
          modalVisible={false}
          toggleModal={toggle}
          name={'Tester'}
          navigation={navigation}
        />
      )
      const element = screen.queryByText('Game Over!')
      expect(element).toBeNull()
    })
  })

  describe('DrawModal', () => {
    it('renders correctly', () => {
      // Dummies for testing the component rendering
      const toggle = () => { }
      const navigation = () => { }
      render(
        <DrawModal
          modalVisible={true}
          toggleModal={toggle}
          navigation={navigation}
        />
      )
      const gameOver = screen.getByText('Game Over!')
      expect(gameOver).toBeDefined()

      const winnerName = screen.getByText('Match ended in draw!')
      expect(winnerName).toBeDefined()
    })

    it('doesnt show when not visible', () => {
      // Dummies for testing the component rendering
      const toggle = () => { }
      const navigation = () => { }
      render(
        <DrawModal
          modalVisible={false}
          toggleModal={toggle}
          navigation={navigation}
        />
      )
      const element = screen.queryByText('Game Over!')
      expect(element).toBeNull()
    })
  })

  describe('StalemateModal', () => {
    it('renders correctly', () => {
      // Dummies for testing the component rendering
      const toggle = () => { }
      const navigation = () => { }
      render(
        <StalemateModal
          modalVisible={true}
          toggleModal={toggle}
          navigation={navigation}
        />
      )
      const gameOver = screen.getByText('Game Over!')
      expect(gameOver).toBeDefined()

      const winnerName = screen.getByText('Match ended in stalemate!')
      expect(winnerName).toBeDefined()
    })

    it('doesnt show when not visible', () => {
      // Dummies for testing the component rendering
      const toggle = () => { }
      const navigation = () => { }
      render(
        <StalemateModal
          modalVisible={false}
          toggleModal={toggle}
          navigation={navigation}
        />
      )
      const element = screen.queryByText('Game Over!')
      expect(element).toBeNull()
    })
  })
})