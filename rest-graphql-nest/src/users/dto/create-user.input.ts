import { IsEmail, IsString } from "class-validator"

export class CreateUserInput {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}
