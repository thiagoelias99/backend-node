import { PrismaService } from "../prisma.service"
import { CreateUserInput } from "src/users/dto/create-user.input"
import { User } from "src/users/entities/user.entity"
import { User as PrismaUser } from "@prisma/client"
import { UsersRepository } from "src/users/users.repository"
import { UpdateUserInput } from "src/users/dto/update-user.input"

export class PrismaUsersRepository implements UsersRepository {
  private prisma = PrismaService.getInstance()

  private prismaUserDto(prisma: PrismaUser): User {
    return {
      id: prisma.id,
      name: prisma.name,
      email: prisma.email,
      password: prisma.password
    }
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
    return this.prismaUserDto(user)
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return users.map(user => this.prismaUserDto(user))
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!user) throw new Error('User not found')
    return this.prismaUserDto(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })
    if (!user) throw new Error('User not found')
    return this.prismaUserDto(user)
  }

  async update(id: number, data: UpdateUserInput): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
      }
    })

    return this.prismaUserDto(user)
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    })
  }

}