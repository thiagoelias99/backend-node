import { Module } from '@nestjs/common'
import { PrismaUsersRepository } from "./repositories/prisma-users.repository"
import { UsersRepository } from "src/users/users.repository"

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    }
  ],
  exports: [UsersRepository]
})
export class PrismaModule { }
