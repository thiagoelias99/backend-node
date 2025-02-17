import { ApiProperty } from "@nestjs/swagger"
import { Comment } from "../entities/comment.entity"
import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class CommentView {
  constructor(comment: Comment) {
    this.id = comment.id
    this.content = comment.content
    this.author = comment.authorName
    this.authorId = comment.authorId
  }

  @ApiProperty()
  @Field(() => Int)
  id: number

  @ApiProperty()
  @Field(() => String)
  content: string

  @ApiProperty()
  @Field(() => String)
  author: string

  @ApiProperty()
  @Field(() => Int)
  authorId: number
}