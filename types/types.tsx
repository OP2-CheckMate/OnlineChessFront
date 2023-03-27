export interface Player {
  id?: number;
  name: string;
}

export type PlayerColor = 'b' | 'w';

export interface Lobby {
  lobbyId: number;
  player1: Player;
  player2?: Player;
  recentMove?: Move;
  isGameOver: boolean;
}

export interface Move {
  from: string,
  to: string,
}