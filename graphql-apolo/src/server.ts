import "reflect-metadata"
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from "type-graphql"
import { PostsResolver } from "./resolver/posts.resolver"
import path from "path"
import { AuthorResolver } from "./resolver/author.resolver"

async function startServer() {
  const schema = await buildSchema({
    resolvers: [
      PostsResolver,
      AuthorResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })


  const server = new ApolloServer({
    schema
  })

  const { url } = await startStandaloneServer(server)
  console.log(`🚀 Server ready at ${url}`)
}

startServer()