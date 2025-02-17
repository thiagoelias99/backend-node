import { ApiProperty } from "@nestjs/swagger"
import { Comment } from "../entities/comment.entity"

export class CommentView {
  constructor(comment: Comment) {
    this.id = comment.id
    this.content = comment.content
    this.author = comment.authorName
  }

  @ApiProperty()
  id: number

  @ApiProperty()
  content: string

  @ApiProperty()
  author: string
}