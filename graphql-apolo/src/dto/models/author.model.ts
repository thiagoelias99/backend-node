import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Author {
  @Field()
  id: string

  @Field()
  name: string
}