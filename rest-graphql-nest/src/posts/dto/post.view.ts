import { ApiProperty } from "@nestjs/swagger"
import { Post } from "../entities/post.entity"
import { CommentView } from "src/comments/dto/comment.view"
import { PaginateInput } from "src/utils/paginate.input"

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

export class PaginatedPostView {
  constructor(items: Post[], totalItem: number, query: PaginateInput) {
    const limit = Number(query.limit) || 10
    const page = Number(query.page) || 1

    this.totalPages = Math.ceil(totalItem / limit)
    this.limit = limit
    this.page = page
    this.totalItems = totalItem
    this.items = items.map(post => new PostView(post))
  }

  @ApiProperty()
  limit: number

  @ApiProperty()
  page: number

  @ApiProperty()
  totalPages: number

  @ApiProperty()
  totalItems: number

  @ApiProperty({ type: [PostView] })
  items: PostView[]
}