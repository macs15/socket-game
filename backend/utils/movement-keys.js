const movementKeys = {
  ArrowUp(player) {
    if (player.y - 1 >= 0) player.y -= 1
  },
  ArrowDown(player, screen) {
    if (player.y + 1 < screen.height) player.y += 1
  },
  ArrowRight(player, screen) {
    if (player.x + 1 < screen.width) player.x += 1
  },
  ArrowLeft(player) {
    if (player.x - 1 >= 0) player.x -= 1
  }
}

export default movementKeys
