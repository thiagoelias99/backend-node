import { Module } from '@nestjs/common'
import { PrismaUsersRepository } from "./repositories/prisma-users.repository"
import { UsersRepository } from "src/users/users.repository"
import { PostsRepository } from "src/posts/posts.repository"
import { PrismaPostsRepository } from "./repositories/prisma-posts-repository"

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository
    }
  ],
  exports: [UsersRepository, PostsRepository]
})
export class PrismaModule { }
