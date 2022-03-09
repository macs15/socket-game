import { io } from 'socket.io-client'
import Game from '../../backend/common/game.js'
import KeyboardListener from './keyboard-listener.js'
import renderScreen from './renderScreen'
import Score from './score.js'

const socket = io('http://localhost:3000')

const game = new Game()
const keyboardListener = new KeyboardListener()
const score = new Score()

socket.on('connect', () => {
  const playerId = socket.id

  const screen = document.getElementById('screen')
  renderScreen(screen, game, requestAnimationFrame, playerId)
})

socket.on('setup', (state) => {
  const playerId = socket.id
  game.setState(state)
  score.addPlayerScore(state)

  keyboardListener.registerPlayerId = playerId
  keyboardListener.subscribe((command) => {
    game.movePlayer(command)
    socket.emit('move-player', command)
  })
})

socket.on('add-player', (command) => {
  console.log(`Receiving ${command.type} -> ${command.playerId}`)
  game.addPlayer(command)
})

socket.on('remove-player', (command) => {
  console.log(`Receiving ${command.type} -> ${command.playerId}`)
  game.removePlayer(command)
})

socket.on('move-player', (command) => {
  console.log(`Receiving ${command.type} -> ${command.playerId}`)
  const playerId = socket.id

  if (playerId !== command.playerId) {
    game.movePlayer(command)
  }
})

socket.on('add-fruit', (command) => {
  console.log(`Receiving ${command.type} -> ${command.fruitId}`)
  game.addFruit(command)
})

socket.on('disconnect', () => {
  console.log(socket.id) // undefined
})
