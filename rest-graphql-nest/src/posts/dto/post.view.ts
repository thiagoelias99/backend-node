import { ApiProperty } from "@nestjs/swagger"
import { Post } from "../entities/post.entity"

export class PostView {
  constructor(post: Post) {
    this.id = post.id
    this.name = post.name
    this.content = post.content
    this.author = post.authorName
  }

  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  content: string

  @ApiProperty()
  author: string
}