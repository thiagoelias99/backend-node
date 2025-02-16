import { Injectable } from '@nestjs/common'
import { CreatePostInput } from "./dto/create-post.input"
import { PostsRepository } from "./posts.repository"
import { PostView } from "./dto/post.view"
import { UpdatePostInput } from "./dto/update-post.input"

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) { }

  async create(data: CreatePostInput, userId: number): Promise<PostView> {
    const post = await this.postsRepository.create(data, userId)

    return new PostView(post)
  }

  async findAll(): Promise<PostView[]> {
    const posts = await this.postsRepository.findAll()

    return posts.map(post => new PostView(post))
  }

  async findOne(id: number): Promise<PostView> {
    const post = await this.postsRepository.findOne(id)

    return new PostView(post)
  }

  async update(id: number, data: UpdatePostInput): Promise<PostView> {
    const post = await this.postsRepository.update(id, data)

    return new PostView(post)
  }

  async remove(id: number) {
    return this.postsRepository.remove(id)
  }
}
