import { Controller, Post, Body, UseGuards, Req, Get, Param, Patch, Delete, Query, BadRequestException } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostInput } from "./dto/create-post.input"
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard"
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { PaginatedPostView, PostView } from "./dto/post.view"
import { UpdatePostInput } from "./dto/update-post.input"
import { PaginateInput } from "src/utils/paginate.input"

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: PostView,
  })
  create(
    @Req() req,
    @Body() data: CreatePostInput) {
    const userId = +req.user.id
    return this.postsService.create(data, userId)
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: PaginatedPostView,
  })
  findAll(
    @Query() query: PaginateInput) {
    const { limit, page } = query
    if (limit && (limit.toString() == "" || isNaN(+limit) || +limit < 1 || +limit > 100)) {
      throw new BadRequestException('limit must be a number between 1 and 100')
    }
    if (page && (page.toString() == "" || isNaN(+page) || +page < 1)) {
      throw new BadRequestException('page must be a number greater than 0')
    }

    query.limit = +limit || 10
    query.page = +page || 1

    return this.postsService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: PostView,
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: PostView,
  })
  update(@Req() req, @Param('id') id: string, @Body() data: UpdatePostInput) {
    const userId = +req.user.id
    return this.postsService.update(+id, data, +userId)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  remove(@Req() req, @Param('id') id: string) {
    const userId = +req.user.id
    return this.postsService.remove(+id, +userId)
  }
}
