import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../utils/base";
import { VideoEntity } from "../video/video.entity";
import { UserEntity } from "../user/user.entity";

@Entity('Comment')
export class CommentEntity extends Base {
  @Column({ nullable: false, type: 'text' })
  message: string;

  @ManyToOne(() => UserEntity, user => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => VideoEntity, video => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity;
}