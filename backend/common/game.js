import movementKeys from '../utils/movement-keys.js'

export default class Game {
  constructor() {
    this.state = {
      players: {},
      fruits: {},
      screen: {
        height: 10,
        width: 10
      }
    }
  }

  setState(state) {
    this.state = state
  }

  observers = []

  start() {
    const frequency = 2000
    // setInterval(addFruit, frequency)
  }

  subscribe(observerFunction) {
    this.observers.push(observerFunction)
  }

  notifyAll(command) {
    for (const observerFunction of this.observers) {
      observerFunction(command)
    }
  }

  addPlayer(command) {
    const playerId = command.playerId
    const playerX =
      'playerX' in command ? command.playerX : Math.floor(Math.random() * this.state.screen.width)
    const playerY =
      'playerY' in command ? command.playerY : Math.floor(Math.random() * this.state.screen.height)

    this.state.players[playerId] = {
      x: playerX,
      y: playerY
    }

    this.notifyAll({
      type: 'add-player',
      playerId,
      playerX,
      playerY
    })
  }

  removePlayer(command) {
    const playerId = command.playerId
    delete this.state.players[playerId]

    this.notifyAll({
      type: 'remove-player',
      playerId: playerId
    })
  }

  movePlayer(command) {
    this.notifyAll(command)

    const { keyPressed, playerId } = command
    const { screen } = this.state
    const player = this.state.players[playerId]
    const moveFunction = movementKeys[keyPressed]

    moveFunction(player, screen)
  }
}
