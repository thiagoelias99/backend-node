import { CreateUserInput } from "./dto/create-user.input"
import { User } from "./entities/user.entity"

export abstract class UsersRepository {
  abstract create(data: CreateUserInput): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findOne(id: number): Promise<User>
  abstract update(id: number, data: Partial<CreateUserInput>): Promise<User>
  abstract remove(id: number): Promise<void>
}