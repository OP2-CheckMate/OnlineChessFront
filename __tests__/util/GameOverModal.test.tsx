import { render, screen } from '@testing-library/react-native'
import React from 'react'
import { CheckmateModal, DrawModal, StalemateModal } from '../../util/GameOverModal'

describe('GameOverModal', () => {
  describe('CheckmateModal', () => {
    it('renders correctly', () => {
      // Dummies for testing the component rendering
      const toggle = () => { return }
      const navigation = () => { return }
      render(
        <CheckmateModal
          modalVisible={true}
          toggleModal={toggle}
          name={'Tester'}
          navigation={navigation}
        />
      )
      const gameOver = screen.getByText('Game Over!')
      expect(gameOver).toBeDefined()

      const winnerName = screen.getByText('Tester won!')
      expect(winnerName).toBeDefined()
    })
  })
  describe('DrawModal', () => {
    it('renders correctly', () => {
      // Dummies for testing the component rendering
      const toggle = () => { return }
      const navigation = () => { return }
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
  })
  describe('StalemateModal', () => {
    it('renders correctly', () => {
      // Dummies for testing the component rendering
      const toggle = () => { return }
      const navigation = () => { return }
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
  })
})