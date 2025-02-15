import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UsersRepository } from "./users.repository"
import { UserView } from "./dto/user.view"
import { UpdateUserInput } from "./dto/update-user.input"
import { hash, verify } from "argon2"

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(data: CreateUserInput): Promise<UserView> {
    const hashedPassword = await hash(data.password)
    const user = await this.usersRepository.create({ ...data, password: hashedPassword })
    return new UserView(user)
  }

  async findAll(): Promise<UserView[]> {
    const users = await this.usersRepository.findAll()
    return users.map(user => new UserView(user))
  }

  async findOne(id: number): Promise<UserView> {
    const user = await this.usersRepository.findOne(id)
    return new UserView(user)
  }

  async login(email: string, password: string): Promise<UserView> {
    try {
      const user = await this.usersRepository.findByEmail(email)
      const passwordValid = await verify(user.password, password)
      if (!passwordValid) throw new UnauthorizedException("Invalid email or password")
      return new UserView(user)
    } catch (error) {
      console.error(error)
      throw new UnauthorizedException("Invalid email or password")
    }
  }

  async update(id: number, data: UpdateUserInput): Promise<UserView> {
    const user = await this.usersRepository.update(id, data)
    return new UserView(user)
  }

  async remove(id: number) {
    return this.usersRepository.remove(id)
  }
}
