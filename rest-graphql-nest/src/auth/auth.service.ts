import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from "src/users/users.service"
import { CreateUserInput } from "src/users/dto/create-user.input"
import { AuthView } from "./dto/auth.view"
import { AuthLoginInput } from "./dto/auth-login.input"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async register(data: CreateUserInput): Promise<AuthView> {
    const user = await this.usersService.create(data)
    const token = await this.generateToken(user.id)
    return new AuthView(user, token)
  }

  async login(data: AuthLoginInput): Promise<AuthView> {
    const user = await this.usersService.login(data.email, data.password)
    const token = await this.generateToken(user.id)

    return new AuthView(user, token)
  }

  private async generateToken(userId: number) {
    const payload = { sub: userId }
    const accessToken = await this.jwtService.signAsync(payload)
    return accessToken
  }

  async validateJWTUser(userId: number) {
    try {
      const user = await this.usersService.findOne(userId)
      if (!user) throw new UnauthorizedException("Invalid token")
      return { id: user.id }
    } catch (error) {
      console.error(error)
      throw new UnauthorizedException("Invalid token")
    }
  }
}