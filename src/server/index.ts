import express, { Application } from 'express'
import { EventEmitter } from 'events'
import morgan from 'morgan'
import config from '@/libs/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import Debug from 'debug'

const debug = Debug('app:server')

export default class Server extends EventEmitter {
  public app: Application = express()

  constructor() {
    super()

    this.app.use(morgan(config.isDev ? 'dev' : 'tiny'))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(cookieParser(config.cookieSecret))
      .use(cors())

    this.config()
  }

  async config() {
    this.ready()
  }

  ready() {
    if (this.listenerCount('ready') > 0) this.emit('ready')
    else setTimeout(() => this.ready(), 500)
  }

  start() {
    this.app.listen(config.port, () => debug(`Server ready on port ${config.port}`))
  }
}
