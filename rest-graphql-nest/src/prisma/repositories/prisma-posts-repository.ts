import { PostsRepository } from "src/posts/posts.repository"
import { PrismaService } from "../prisma.service"
import { Prisma } from "@prisma/client"
import { Post } from "src/posts/entities/post.entity"
import { CreatePostInput } from "src/posts/dto/create-post.input"
import { NotFoundException } from "@nestjs/common"
import { UpdatePostInput } from "src/posts/dto/update-post.input"

export class PrismaPostsRepository extends PostsRepository {
  private prisma = PrismaService.getInstance()

  private prismaPostDto(prisma: Prisma.PostGetPayload<{
    include: {
      author: true,
      comments: true
    }
  }>): Post {
    return {
      id: prisma.id,
      name: prisma.title,
      content: prisma.content,
      authorId: prisma.authorId,
      authorName: prisma.author.name,
    }
  }

  async create(data: CreatePostInput, userId: number): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        title: data.name,
        content: data.content,
        authorId: userId
      },
      include: {
        author: true,
        comments: true
      }
    })

    return this.prismaPostDto(post)
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        author: true,
        comments: true
      }
    })

    return posts.map(this.prismaPostDto)
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: true
      }
    })
    if (!post) throw new NotFoundException('Post not found')
    return this.prismaPostDto(post)
  }

  async update(id: number, data: UpdatePostInput): Promise<Post> {
    try {
      const post = await this.prisma.post.update({
        where: { id },
        data: {
          title: data.name,
          content: data.content
        },
        include: {
          author: true,
          comments: true
        }
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

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.post.delete({
        where: { id }
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