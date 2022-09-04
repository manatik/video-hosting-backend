import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "./user.decorator";
import { UserDto } from "./user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async all() {
    return await this.userService.getAll();
  }

  @Get('profile')
  @Auth()
  async profile(@CurrentUser('id') id: number) {
    return await this.userService.getById(id);
  }

  @Get(':id')
  async user(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserDto
  ) {
    return await this.userService.updateProfile(id, dto);
  }

  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @Auth()
  async subscribe(
    @Param('channelId', ParseIntPipe) channelId: number,
    @CurrentUser('id') id: number
  ) {
    return await this.userService.subscribe(id, channelId);
  }
}
