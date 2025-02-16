import { Controller, Post, Body, UseGuards, Req, Get, Param, Patch, Delete } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostInput } from "./dto/create-post.input"
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard"
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { PostView } from "./dto/post.view"
import { UpdatePostInput } from "./dto/update-post.input"

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
    type: [PostView],
  })
  findAll(@Req() req) {
    return this.postsService.findAll()
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
  update(@Param('id') id: string, @Body() data: UpdatePostInput) {
    return this.postsService.update(+id, data)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id)
  }
}
