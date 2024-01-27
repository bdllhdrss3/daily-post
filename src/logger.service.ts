import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name)

  use(req: Request, res: Response, next: NextFunction) {
    const ipAddress = req.ip || req.connection.remoteAddress
    const method = req.method
    const path = req.url

    this.logger.log(`Request from ${ipAddress} - ${method} ${path}`)
    next()
  }
}
