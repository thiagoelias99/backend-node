import { Field, InputType } from "type-graphql"

@InputType()
export class CreatePostInput {
  @Field()
  authorId: string

  @Field()
  title: string

  @Field()
  content: string
}