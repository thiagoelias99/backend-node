import { UserView } from "src/users/dto/user.view"

export class AuthView {
  constructor(data: UserView, token: string) {
    this.id = data.id
    this.name = data.name
    this.token = token
  }

  id: number
  name: string
  token: string
}