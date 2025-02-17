import { CreatePostInput } from "./dto/create-post.input"
import { UpdatePostInput } from "./dto/update-post.input"
import { Post } from "./entities/post.entity"
import { QueryPostInput } from "./dto/query-post.input"

export abstract class PostsRepository {
  abstract create(data: CreatePostInput, userId: number): Promise<Post>
  abstract findAll(query: QueryPostInput): Promise<[Post[], number]>
  abstract findOne(id: number): Promise<Post>
  abstract update(id: number, data: UpdatePostInput, userId: number): Promise<Post>
  abstract remove(id: number, userId: number): Promise<void>
}