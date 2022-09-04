import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CurrentUser } from "../user/user.decorator";
import { VideoDto } from "./video.dto";
import { Auth } from "../auth/decorators/auth.decorator";

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {
  }

  @Get('private/:id')
  async getPrivateVideo(@Param('id', ParseIntPipe) id: number) {
    return await this.videoService.byId(id);
  }

  @Get('all')
  async all(@Query('searchTerm') searchTerm: string) {
    return await this.videoService.getAll(searchTerm);
  }

  @Get('most-popular')
  async mostPopularByViews() {
    return await this.videoService.getMostPopularByViews();
  }

  @Get(':id')
  async video(@Param('id', ParseIntPipe) id: number) {
    return await this.videoService.byId(id, true);
  }

  @HttpCode(200)
  @Post(':id')
  async create(@CurrentUser('id') userId: number) {
    return await this.videoService.create(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VideoDto
  ) {
    return await this.videoService.update(id, dto);
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.videoService.delete(id);
  }

  @HttpCode(200)
  @Put('update-views/:videoId')
  async updateViews(@Param('videoId', ParseIntPipe) videoId: number) {
    return await this.videoService.updateCountViews(videoId);
  }

  @HttpCode(200)
  @Put('update-likes/:videoId')
  async updateLikes(@Param('videoId', ParseIntPipe) videoId: number) {
    return await this.videoService.updateReaction(videoId);
  }
}
