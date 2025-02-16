import { CreatePostInput } from "./dto/create-post.input"
import { UpdatePostInput } from "./dto/update-post.input"
import { Post } from "./entities/post.entity"

export abstract class PostsRepository {
  abstract create(data: CreatePostInput, userId: number): Promise<Post>
  abstract findAll(): Promise<Post[]>
  abstract findOne(id: number): Promise<Post>
  abstract update(id: number, data: UpdatePostInput): Promise<Post>
  abstract remove(id: number): Promise<void>
}