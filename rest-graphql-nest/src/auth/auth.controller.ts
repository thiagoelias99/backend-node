import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserInput } from "src/users/dto/create-user.input"
import { AuthLoginInput } from "./dto/auth-login.input"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() data: CreateUserInput) {
    return this.authService.register(data)
  }

  @Post('login')
  login(@Body() data: AuthLoginInput) {
    return this.authService.login(data)
  }

}
