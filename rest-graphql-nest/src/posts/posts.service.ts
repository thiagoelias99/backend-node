import { Injectable } from '@nestjs/common'
import { CreatePostInput } from "./dto/create-post.input"
import { PostsRepository } from "./posts.repository"
import { PaginatedPostView, PostView } from "./dto/post.view"
import { UpdatePostInput } from "./dto/update-post.input"
import { QueryPostInput } from "./dto/query-post.input"

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) { }

  async create(data: CreatePostInput, userId: number): Promise<PostView> {
    const post = await this.postsRepository.create(data, userId)

    return new PostView(post)
  }

  async findAll(query: QueryPostInput): Promise<PaginatedPostView> {
    const [posts, count] = await this.postsRepository.findAll(query)

    return new PaginatedPostView(posts, count, query)
  }

  async findOne(id: number): Promise<PostView> {
    const post = await this.postsRepository.findOne(id)

    return new PostView(post)
  }

  async update(id: number, data: UpdatePostInput, userId: number): Promise<PostView> {
    const post = await this.postsRepository.update(id, data, userId)

    return new PostView(post)
  }

  async remove(id: number, userId: number) {
    return this.postsRepository.remove(id, userId)
  }
}
