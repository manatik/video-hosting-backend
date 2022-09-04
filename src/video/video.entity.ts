import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Base } from '../utils/base';
import { CommentEntity } from "../comment/comment.entity";

@Entity('Video')
export class VideoEntity extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ default: false, nullable: false })
  isPublic: boolean;

  @Column({ default: 0 })
  views?: number;

  @Column({ default: 0 })
  likes?: number;

  @Column({ default: 0 })
  duration?: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  videoPath: string;

  @Column({ name: 'thumbnail_path', nullable: false })
  thumbnailPath: string;

  @ManyToOne(() => UserEntity, user => user.videos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, comment => comment.video)
  comments: CommentEntity[];
}