export default class Game {
  constructor() {
    this.players = {}
    this.fruits
    this.screen = {
      height: 10,
      width: 10
    }
  }

  observers = []

  start() {
    const frequency = 2000
    // setInterval(addFruit, frequency)
  }

  subscribe(observerFunction) {
    this.observers.push(observerFunction)
  }

  notifyAll(key, payload) {
    for (const observerFunction of this.observers) {
      observerFunction(key, payload)
    }
  }

  addPlayer(command) {
    const playerId = command.playerId
    const playerX =
      'playerX' in command ? command.playerX : Math.floor(Math.random() * this.screen.width)
    const playerY =
      'playerY' in command ? command.playerY : Math.floor(Math.random() * this.screen.height)

    this.players[playerId] = {
      x: playerX,
      y: playerY
    }
  }
}
