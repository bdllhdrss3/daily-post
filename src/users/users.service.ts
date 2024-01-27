// users/user.service.ts
import { Injectable, ConflictException } from '@nestjs/common'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt' // Import JwtService
import { LoginDto } from './dto/login.dto'
@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {} // Inject JwtService

  static async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    return User.create({
      ...createUserDto,
      password: hashedPassword,
    })
  }

  static async login(
    loginDto: LoginDto,
  ): Promise<{ success: boolean; message: string; token?: string }> {
    const user = await UserService.findOneUser(loginDto.email)
    if (!user) {
      return { success: false, message: 'User not found' }
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    )
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid password' }
    }

    // const token = this.generateToken(user.id, user.email);
    const jwtService = new JwtService({
      secret: 'secret-key',
      signOptions: { expiresIn: '1h' },
    })
    const payload = { userid: user.id, email: user.email }
    const token = jwtService.sign(payload)

    return { success: true, message: 'Login successful', token }
  }

  private generateToken(userId: string, userEmail: string): string {
    const payload = { sub: userId, email: userEmail }
    return this.jwtService.sign(payload) // Use this.jwtService.sign to sign the token
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })
  }
  static async findOneUser(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
    })
  }

  static async findAll(): Promise<User | null | any> {
    return User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })
  }
}
