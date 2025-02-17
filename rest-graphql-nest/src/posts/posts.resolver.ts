import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { PostView } from "./dto/post.view"
import { PostsService } from "./posts.service"
import { QueryPostInput } from "./dto/query-post.input"

@Resolver(() => PostView)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Query(() => [PostView], { name: 'posts' })
  async findAll(
    @Args("limit", { nullable: true }) limit?: number,
    @Args("page", { nullable: true }) page?: number,
    @Args("authorId", { nullable: true }) authorId?: number,
    @Args("authorName", { nullable: true }) authorName?: string,
    @Args("content", { nullable: true }) content?: string,
    @Args("name", { nullable: true }) name?: string
  ): Promise<PostView[]> {
    const normalizedQuery = {
      page: page || 1,
      limit: limit || 10,
      authorId: authorId,
      authorName: authorName,
      content: content,
      name: name
    } as QueryPostInput

    return this.postsService.findAll(normalizedQuery)
  }

  @Query(() => PostView, { name: 'post' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<PostView> {
    return this.postsService.findOne(id)
  }

  @Query(() => Int, { name: 'postsCount' })
  async count(): Promise<number> {
    return this.postsService.count()
  }
}
