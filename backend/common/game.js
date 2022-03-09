import movementKeys from '../utils/movement-keys.js'

export default class Game {
  constructor() {
    this.state = {
      players: {},
      fruits: {},
      screen: {
        height: 10,
        width: 10
      },
      score: {}
    }
  }

  setState(state) {
    this.state = state
  }

  observers = []

  start() {
    const frequency = 2000

    setInterval(() => {
      this.addFruit()
    }, frequency)
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
    this.checkForCollisionWithFruit({ playerId })
  }

  addFruit(command) {
    const limitOfFruits = 1

    if (Object.entries(this.state.fruits).length >= limitOfFruits) return

    const fruitId = command
      ? command.fruitId
      : new Date().getTime().toString() + Math.floor(Math.random() * 10000000)
    const fruitX = command ? command.fruitX : Math.floor(Math.random() * this.state.screen.width)
    const fruitY = command ? command.fruitY : Math.floor(Math.random() * this.state.screen.height)

    this.state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY
    }

    this.notifyAll({
      type: 'add-fruit',
      fruitX,
      fruitY,
      fruitId
    })
  }

  removeFruit(command) {
    const fruitId = command.fruitId
    delete this.state.fruits[fruitId]

    this.notifyAll({
      type: 'remove-fruit',
      fruitId
    })
  }

  checkForCollisionWithFruit(command) {
    const playerId = command.playerId
    const player = this.state.players[playerId]
    const fruits = this.state.fruits

    for (const fruitId in fruits) {
      const fruit = fruits[fruitId]

      if (player.x === fruit.x && player.y === fruit.y) {
        console.log(`COLLISION between ${playerId} and ${fruitId}`)
        this.removeFruit({ fruitId })
      }
    }
  }
}
