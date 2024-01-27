// users/user.controller.ts

import {
  Controller,
  Post,
  Get,
  Body,
  ConflictException,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from './auth.guard'

@Controller('users')
export class UserController {
  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ success: boolean; message: string; data?: User }> {
    try {
      const existingUser = await UserService.findUserByEmail(
        createUserDto.email,
      )
      if (existingUser) {
        throw new ConflictException('Email is already in use')
      }

      await UserService.createUser(createUserDto)

      return {
        success: true,
        message: 'User created successfully, proceed to dwonload',
      }
    } catch (error) {
      // Handle specific error types or provide a generic error message
      return {
        success: false,
        message: error.message || 'Failed to create user',
      }
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ success: boolean; message: string; token?: string }> {
    return await UserService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @Get('users')
  async getUSers(): Promise<any> {
    try {
      const users = await UserService.findAll()
      return {
        data: users,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to get user',
      }
    }
  }
}
