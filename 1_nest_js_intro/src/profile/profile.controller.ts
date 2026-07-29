import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const profile = await this.profileService.findOne(id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  @Get('user/:userid')
  async findByUserId(@Param('userid', ParseIntPipe) userid: number) {
    const profile = await this.profileService.findByUserId(userid);
    if (!profile) {
      throw new NotFoundException('Profile not found for this user');
    }
    return profile;
  }

  @Post('user/:userid')
  create(
    @Param('userid', ParseIntPipe) userid: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.create(userid, createProfileDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.profileService.update(id, updateProfileDto);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const profile = await this.profileService.remove(id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
