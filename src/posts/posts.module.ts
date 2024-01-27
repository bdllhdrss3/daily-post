import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CronService } from './cron.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [PostsController],
  providers: [PostsService, CronService, CloudinaryService],
})
export class PostsModule {}
