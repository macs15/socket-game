export default class KeyboardListener {
  constructor() {
    this.observers = []
    this.playerId = null

    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  set registerPlayerId(playerId) {
    this.playerId = playerId
  }

  subscribe(observerFunction) {
    this.observers.push(observerFunction)
  }

  notifyAll(command) {
    for (const observerFunction of this.observers) {
      observerFunction(command)
    }
  }

  handleKeyDown(event) {
    const keyPressed = event.key

    this.notifyAll({
      type: 'move-player',
      playerId: this.playerId,
      keyPressed
    })
  }
}
