import { UserView } from "src/users/dto/user.view"

export class AuthView {
  constructor(data: UserView) {
    this.id = data.id
    this.name = data.name
    this.token = ""
  }

  id: number
  name: string
  token: string
}