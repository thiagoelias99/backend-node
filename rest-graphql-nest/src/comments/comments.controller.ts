import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard"
import { CreateCommentInput } from "./dto/create-comment.input"
import { CommentView } from "./dto/comment.view"
import { UpdateCommentInput } from "./dto/update-comment.input"

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new comment to a post' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: CommentView,
  })
  create(
    @Req() req,
    @Body() data: CreateCommentInput) {
    const userId = +req.user.id
    return this.commentsService.create(data, userId)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CommentView,
  })
  update(@Req() req, @Param('id') id: string, @Body() data: UpdateCommentInput) {
    const userId = +req.user.id
    return this.commentsService.update(+id, data, userId)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  remove(@Req() req, @Param('id') id: string) {
    const userId = +req.user.id
    return this.commentsService.remove(+id, userId)
  }
}
