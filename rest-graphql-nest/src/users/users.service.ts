import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UsersRepository } from "./users.repository"

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  create(data: CreateUserInput) {
    return this.usersRepository.create(data)
  }

  findAll() {
    return this.usersRepository.findAll()
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id)
  }

  update(id: number, data: CreateUserInput) {
    return this.usersRepository.update(id, data)
  }

  remove(id: number) {
    return this.usersRepository.remove(id)
  }
}
