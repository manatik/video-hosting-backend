import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { VideoEntity } from "./video.entity";
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from "typeorm";
import { VideoDto } from "./video.dto";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>
  ) {
  }

  async byId(id: number, isPublic = false): Promise<VideoEntity> {
    const video = await this.videoRepository.findOne({
      where: isPublic
        ? { id, isPublic }
        : { id },
      relations: {
        user: true,
        comments: {
          user: true
        }
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          isVerified: true,
          subscribersCount: true,
          subscriptions: true
        },
        comments: {
          message: true,
          id: true,
          user: {
            id: true,
            name: true,
            avatarPath: true,
            isVerified: true,
            subscribersCount: true
          }
        }
      }
    })

    if (!video) {
      throw new NotFoundException('Видео не найдено');
    }

    return video;
  }

  async update(id: number, dto: VideoDto): Promise<VideoEntity> {
    const video = await this.byId(id);

    return this.videoRepository.save({ ...video, ...dto });
  }

  async getAll(searchTerm?: string): Promise<VideoEntity[]> {
    let options: FindOptionsWhereProperty<VideoEntity> = {};

    if (searchTerm) {
      options = {
        name: ILike(`%${searchTerm}%`)
      }
    }

    return this.videoRepository.find({
      where: {
        ...options,
        isPublic: true
      },
      order: {
        createdAt: 'DESC'
      },
      relations: {
        user: true,
        comments: {
          user: true
        }
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          isVerified: true
        }
      }
    })
  }

  async getMostPopularByViews(): Promise<VideoEntity[]> {
    return this.videoRepository.find({
      where: {
        views: MoreThan(0)
      },
      relations: {
        user: true
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          isVerified: true
        }
      },
      order: {
        views: -1
      }
    })
  }

  async create(userId: number): Promise<number> {
    const defaultValues = {
      name: '',
      user: { id: userId },
      videoPath: '',
      description: '',
      thumbnailPath: ''
    };

    const newVideo = this.videoRepository.create(defaultValues);
    const video = await this.videoRepository.save(newVideo);

    return video.id;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.videoRepository.delete({ id });
  }

  async updateCountViews(id: number): Promise<VideoEntity> {
    const video = await this.byId(id);
    video.views++;
    return this.videoRepository.save(video);
  }

  async updateReaction(id: number): Promise<VideoEntity> {
    const video = await this.byId(id);
    video.likes++;
    return this.videoRepository.save(video);
  }
}
