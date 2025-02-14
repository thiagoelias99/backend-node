import { Field, InputType } from "type-graphql"

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string
}