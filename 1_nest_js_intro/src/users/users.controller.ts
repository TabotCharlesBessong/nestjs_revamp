import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  // Param,
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
    // console.log('Create user:', newUser);
    return this.usersService.createUser(newUser);
  }

  @Get(':id')
  getSingleUser() {
    // return this.usersService.getUserById(id);
  }

  @Patch(':id')
  updateUser(@Body() body: UpdateUserDto) {
    // update user based on id passed in the param
    return this.usersService.updateUser(1, body);
  }
}
