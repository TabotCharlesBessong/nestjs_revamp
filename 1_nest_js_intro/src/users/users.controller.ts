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
  constructor(private readonly usersService: UsersService) {}
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
    console.log(query);
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body(new ValidationPipe()) newUser: CreateUserDto) {
    // console.log(newUser);
    return this.usersService.createUser(newUser);
  }

  @Get(':id')
  getSingleUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch()
  updateUser(@Body() body: UpdateUserDto) {
    console.log('Update user:', body);
    return { message: 'User updated successfully' };
  }
}
