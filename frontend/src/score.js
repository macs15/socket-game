export default class Score {
  constructor() {
    this.playersScoreContainer = document.getElementById('players-score')
  }

  addPlayerScore(gameState) {
    const players = gameState.state.players
    const playerScore = document.createElement('p')
    playerScore.textContent = '0'

    for (const playerId in players) {
    }
  }
}
