import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query() query: any) {
    const userService = new UsersService();
    console.log(query);
    return userService.getAllUsers();
  }

  @Post()
  createUser() {
    const userService = new UsersService();
    const newUser = {
      id: 3,
      name: 'John',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      age: 28,
      gender: 'Female',
      isMarried: false,
    };
    return userService.createUser(newUser);
  }

  @Get(':id')
  getSingleUser(@Param('id') id:any) {
    const userService = new UsersService();
    // console.log(param)
    return userService.getUserById(+id);
  }
}
