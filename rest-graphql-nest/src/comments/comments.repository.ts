import { CreateCommentInput } from "./dto/create-comment.input"
import { UpdateCommentInput } from "./dto/update-comment.input"
import { Comment } from "./entities/comment.entity"

export abstract class CommentsRepository {
  abstract create(data: CreateCommentInput, userId: number): Promise<Comment>
  abstract update(id: number, data: UpdateCommentInput, userId: number): Promise<Comment>
  abstract remove(id: number, userId: number): Promise<void>
}