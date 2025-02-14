import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql"
import { Author } from "../dto/models/author.model"
import { randomUUID } from "crypto"
import { CreateAuthorInput } from "../dto/inputs/create-author.input"
import { Post } from "../dto/models/post.model"
import { PostsResolver } from "./posts.resolver"

@Resolver(() => Author)
export class AuthorResolver {
  static authors: Author[] = []

  @Query(() => [Author])
  async allAuthors() {
    return AuthorResolver.authors
  }

  @Mutation(() => Author)
  async createAuthor(@Arg("data") data: CreateAuthorInput) {
    const author = new Author()
    author.name = data.name
    author.id = randomUUID()
    AuthorResolver.authors.push(author)
    return author
  }

  @FieldResolver(() => [Post])
  async posts(@Root() author: Author) {
    const posts = PostsResolver.posts.filter(post => post.authorId === author.id)

    return posts
  }
}