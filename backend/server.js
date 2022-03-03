import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import Game from './common/game.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(
  cors({
    origin: '*'
  })
)

const game = new Game()
game.start()

game.subscribe((command) => {
  console.log(`Emitting ${command.type}`)
  io.emit(command.type, command)
})

app.get('/', (req, res) => {
  res.status(200).json('Hello world')
})

io.on('connection', (socket) => {
  const playerId = socket.id

  game.addPlayer({ playerId })
  console.log(`> Player connected: ${playerId}`)
  // console.log(game.state)

  socket.emit('setup', game.state)

  socket.on('disconnect', () => {
    const playerId = socket.id
    game.removePlayer({ playerId })

    console.log(`> Player disconnected: ${playerId}`)
  })

  socket.on('move-player', (command) => {
    command.playerId = playerId
    command.type = 'move-player'

    game.movePlayer(command)
  })
})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
