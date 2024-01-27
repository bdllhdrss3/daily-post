// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const jwtService = new JwtService({
      secret: 'secret-key',
      signOptions: { expiresIn: '1h' },
    })
    const request = context.switchToHttp().getRequest()
    let token = request.headers.authorization

    if (!token) {
      return false
    }
    token = request.headers.authorization.split(' ')[1]

    try {
      const decoded = jwtService.verify(token)
      request.user = decoded
      return true
    } catch (error) {
      return false
    }
  }
}
