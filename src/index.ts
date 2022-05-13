import Server  from './server'
import './bot'

const server = new Server()

server.on('ready', () => {
  server.start()
})
