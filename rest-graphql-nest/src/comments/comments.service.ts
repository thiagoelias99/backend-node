import { Injectable } from '@nestjs/common'
import { CommentsRepository } from "./comments.repository"
import { CommentView } from "./dto/comment.view"
import { UpdateCommentInput } from "./dto/update-comment.input"

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) { }

  async create(data, userId): Promise<CommentView> {
    const comment = await this.commentsRepository.create(data, userId)
    return new CommentView(comment)
  }

  async update(id: number, data: UpdateCommentInput, userId: number): Promise<CommentView> {
    const comment = await this.commentsRepository.update(id, data, userId)
    return new CommentView(comment)
  }

  async remove(id: number, userId: number): Promise<void> {
    return this.commentsRepository.remove(id, userId)
  }
}
