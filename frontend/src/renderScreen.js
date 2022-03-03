const renderScreen = (screen, game, requestAnimationFrame, currentPlayerId) => {
  const context = screen.getContext('2d')

  if (!context) return

  context.fillStyle = 'white'
  context.clearRect(0, 0, 10, 10)

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = '#333'
    context.fillRect(player.x, player.y, 1, 1)
  }

  const currentPlayer = game.state.players[currentPlayerId]

  if (currentPlayer) {
    context.fillStyle = '#F0DB4F'
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
  }

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
  })
}

export default renderScreen
