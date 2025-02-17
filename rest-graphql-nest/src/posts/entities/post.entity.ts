import { Comment } from "src/comments/entities/comment.entity"

export class Post {
  id: number
  name: string
  content: string
  authorId: number
  authorName: string
  comments: Comment[]
}
