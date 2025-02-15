import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() data: CreateUserInput) {
    return this.usersService.create(data)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: CreateUserInput) {
    return this.usersService.update(+id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
