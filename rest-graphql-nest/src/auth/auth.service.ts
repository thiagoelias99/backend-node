import { Injectable } from '@nestjs/common'
import { UsersService } from "src/users/users.service"
import { CreateUserInput } from "src/users/dto/create-user.input"
import { AuthView } from "./dto/auth.view"
import { AuthLoginInput } from "./dto/auth-login.input"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async register(data: CreateUserInput): Promise<AuthView> {
    const user = await this.usersService.create(data)

    return new AuthView(user)
  }

  async login(data: AuthLoginInput): Promise<AuthView> {
    const user = await this.usersService.login(data.email, data.password)

    return new AuthView(user)
  }
}