import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from './users.providers';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ...UsersRepository],
})
export class UsersModule {}
