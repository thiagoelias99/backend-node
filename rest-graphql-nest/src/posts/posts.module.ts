import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { PrismaModule } from "src/prisma/prisma.module"
import { PostsResolver } from './posts.resolver';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsResolver],
  imports: [PrismaModule]
})
export class PostsModule { }
