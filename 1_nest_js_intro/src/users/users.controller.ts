import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sort') sort: string,
  ) {
    const query = {
      limit,
      page,
      sort,
    };
    const userService = new UsersService();
    console.log(query);
    return userService.getAllUsers();
  }

  @Post()
  createUser(@Body(new ValidationPipe()) newUser: CreateUserDto) {
    const userService = new UsersService();
    // console.log(newUser);
    return userService.createUser(newUser);
  }

  @Get(':id')
  getSingleUser(@Param('id', ParseIntPipe) id: number) {
    const userService = new UsersService();
    // console.log(typeof id, id)
    return userService.getUserById(id);
  }

  @Patch()
  updateUser(@Body() body: UpdateUserDto) {
    console.log('Update user:', body);
    return { message: 'User updated successfully' };
  }
}
