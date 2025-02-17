import { CommentsRepository } from "src/comments/comments.repository"
import { PrismaService } from "../prisma.service"
import { CreateCommentInput } from "src/comments/dto/create-comment.input"
import { Comment } from "src/comments/entities/comment.entity"
import { Prisma } from "@prisma/client"
import { NotFoundException } from "@nestjs/common"
import { UpdateCommentInput } from "src/comments/dto/update-comment.input"

export class PrismaCommentsRepository extends CommentsRepository {
  private prisma = PrismaService.getInstance()

  private payload = {
    include: {
      author: {
        select: {
          id: true,
          name: true
        }
      },
      post: {
        select: {
          id: true
        }
      }
    }
  }
  private prismaCommentDto(prisma: Prisma.CommentGetPayload<typeof this.payload>): Comment {
    return {
      id: prisma.id,
      content: prisma.content,
      authorId: prisma.author.id,
      authorName: prisma.author.name,
      postId: prisma.post.id
    }
  }

  async create(data: CreateCommentInput, userId: number): Promise<Comment> {
    const comment = await this.prisma.comment.create({
      data: {
        content: data.content,
        postId: data.postId,
        authorId: userId
      },
      include: this.payload.include
    })
    return this.prismaCommentDto(comment)
  }

  async update(id: number, data: UpdateCommentInput, userId: number): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.update({
        where: { id, authorId: userId },
        data: {
          content: data.content
        },
        include: this.payload.include
      })
      return this.prismaCommentDto(comment)
    } catch (error) {
      console.error(error)
      if (error.code === 'P2025') {
        throw new NotFoundException('Comment not found')
      }
      throw error
    }
  }

  async remove(id: number, userId: number): Promise<void> {
    try {
      await this.prisma.comment.delete({
        where: { id, authorId: userId }
      })
    } catch (error) {
      console.error(error)
      if (error.code === 'P2025') {
        throw new NotFoundException('Comment not found')
      }
      throw error
    }
  }
}