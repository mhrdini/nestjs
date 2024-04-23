import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  /*
    GET /users?role=value
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
  */

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() user: object) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: object) {
    return { id, ...user };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
