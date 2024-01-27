// src/posts/cron.service.ts

import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Op } from 'sequelize'
import { Post } from './entities/post.entity'

@Injectable()
export class CronService {
  @Cron('*/5000000000000 * * * * *')
  async handleCron() {
    const expirationTimestamp = new Date().getTime()
    const formattedTimestamp = new Date(expirationTimestamp).toISOString()
    await Post.destroy({
      where: {
        ttl: {
          [Op.not]: null,
          [Op.lt]: formattedTimestamp,
        },
      },
    })
  }
}
