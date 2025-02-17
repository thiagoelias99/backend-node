import { PostsRepository } from "src/posts/posts.repository"
import { PrismaService } from "../prisma.service"
import { Prisma } from "@prisma/client"
import { Post } from "src/posts/entities/post.entity"
import { CreatePostInput } from "src/posts/dto/create-post.input"
import { NotFoundException } from "@nestjs/common"
import { UpdatePostInput } from "src/posts/dto/update-post.input"
import { QueryPostInput } from "src/posts/dto/query-post.input"

export class PrismaPostsRepository extends PostsRepository {
  private prisma = PrismaService.getInstance()

  private payload = {
    include: {
      author: {
        select: {
          id: true,
          name: true
        }
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { id: 'desc' as Prisma.SortOrder }
      }
    }
  }

  private prismaPostDto(post: Prisma.PostGetPayload<typeof this.payload>): Post {
    return {
      id: post.id,
      name: post.title,
      content: post.content,
      authorId: post.authorId,
      authorName: post.author.name,
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        authorId: comment.author.id,
        authorName: comment.author.name,
        postId: post.id
      }))
    }
  }

  async create(data: CreatePostInput, userId: number): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        title: data.name,
        content: data.content,
        authorId: userId
      },
      include: this.payload.include
    })

    return this.prismaPostDto(post)
  }

  async findAll(query: QueryPostInput): Promise<[Post[], number]> {
    const limit = Number(query.limit)
    const page = Number(query.page)

    const where = {
      title: {
        contains: query.name,
      },
      content: {
        contains: query.content,
      },
      authorId: query.authorId,
      author: {
        name: {
          contains: query.authorName
        }
      }
    }

    const posts = await this.prisma.post.findMany({
      where,
      include: this.payload.include,
      orderBy: { id: 'desc' },
      skip: limit * (page - 1),
      take: limit,
    })

    return [posts.map(this.prismaPostDto), await this.prisma.post.count({ where })]
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: this.payload.include
    })
    if (!post) throw new NotFoundException('Post not found')
    return this.prismaPostDto(post)
  }

  async update(id: number, data: UpdatePostInput, userId: number): Promise<Post> {
    try {
      const post = await this.prisma.post.update({
        where: { id, authorId: userId },
        data: {
          title: data.name,
          content: data.content
        },
        include: this.payload.include
      })
      return this.prismaPostDto(post)
    } catch (error) {
      console.error(error)
      if (error.code === 'P2025') {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }

  async remove(id: number, userId: number): Promise<void> {
    try {
      await this.prisma.post.delete({
        where: { id, authorId: userId }
      })
    } catch (error) {
      console.error(error)
      if (error.code === 'P2025') {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }
}