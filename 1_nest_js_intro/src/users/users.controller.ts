import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    const userService = new UsersService();
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
}
