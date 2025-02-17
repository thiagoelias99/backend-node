import { ApiProperty } from "@nestjs/swagger"
import { Post } from "../entities/post.entity"
import { CommentView } from "src/comments/dto/comment.view"

export class PostView {
  constructor(post: Post) {
    this.id = post.id
    this.name = post.name
    this.content = post.content
    this.author = post.authorName
    this.comments = post.comments.map(comment => new CommentView(comment))
  }

  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  content: string

  @ApiProperty()
  author: string

  @ApiProperty({ type: [CommentView] })
  comments: CommentView[]
}