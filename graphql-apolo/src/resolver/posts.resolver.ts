import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql"
import { CreatePostInput } from "../dto/inputs/create-post.input"
import { Post } from "../dto/models/post.model"
import { Author } from "../dto/models/author.model"
import { randomUUID } from "crypto"
import { AuthorResolver } from "./author.resolver"

@Resolver(() => Post)
export class PostsResolver {
  static posts: Post[] = []

  @Query(() => [Post])
  async allPosts() {
    return PostsResolver.posts
  }

  @Mutation(() => Post)
  async createPost(@Arg("data") data: CreatePostInput) {
    const post = new Post()
    post.title = data.title
    post.content = data.content
    post.id = randomUUID()
    post.authorId = data.authorId
    PostsResolver.posts.push(post)
    return post
  }

  @FieldResolver(() => Author)
  async author(@Root() post: Post) {
    const author = AuthorResolver.authors.find(author => author.id === post.authorId)
    if (!author) {
      throw new Error('Author not found')
    }
    return author
  }
}