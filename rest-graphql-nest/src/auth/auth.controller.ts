import { Controller, Get, Post, Body, UseGuards, Res, Req, HttpCode } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { CreateUserInput } from "src/users/dto/create-user.input"
import { AuthLoginInput } from "./dto/auth-login.input"
import { GoogleAuthGuard } from "./guards/google-auth/google-auth.guard"
import { ConfigService } from "@nestjs/config"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { AuthView } from "./dto/auth.view"

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) { }

  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: AuthView,
  })
  register(@Body() data: CreateUserInput) {
    return this.authService.register(data)
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: AuthView,
  })
  login(@Body() data: AuthLoginInput) {
    return this.authService.login(data)
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  @HttpCode(302)
  @ApiOperation({ summary: 'Login or Register with Google' })
  @ApiResponse({
    status: 302,
    description: 'Redirect',
  })
  googleLogin() { }

  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  @HttpCode(302)
  @ApiOperation({ summary: 'Google callback' })
  @ApiResponse({
    status: 302,
    description: 'Redirect',
  })
  async googleCallback(
    @Req() req,
    @Res() res: Response
  ) {
    const response = await this.authService.login({
      email: req.user.email,
      password: ""
    })

    res.redirect(`${this.configService.get<string>('FRONTEND_GOOGLE_CALLBACK_URL') as string}?token=${response.token}&name=${response.name}&id=${response.id}`)
  }
}
