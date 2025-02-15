import { ApiProperty } from "@nestjs/swagger"
import { User } from "../entities/user.entity"

export class UserView {
  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
  }

  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string
}