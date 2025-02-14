import { Field, ObjectType } from "type-graphql"

/**
 * Definir os campos que o cliente graphql pode solicitar
 * Não é necessário definir foregn keys (ids) de outros models
 */

@ObjectType()
export class Post {
  @Field()
  id: string

  @Field()
  authorId: string

  @Field()
  title: string

  @Field()
  content: string
}