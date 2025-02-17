import { Module } from '@nestjs/common'
import { PrismaUsersRepository } from "./repositories/prisma-users.repository"
import { UsersRepository } from "src/users/users.repository"
import { PostsRepository } from "src/posts/posts.repository"
import { PrismaPostsRepository } from "./repositories/prisma-posts.repository"
import { CommentsRepository } from "src/comments/comments.repository"
import { PrismaCommentsRepository } from "./repositories/prisma-comments.repository"

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository
    },
    {
      provide: CommentsRepository,
      useClass: PrismaCommentsRepository
    }
  ],
  exports: [UsersRepository, PostsRepository, CommentsRepository]
})
export class PrismaModule { }
