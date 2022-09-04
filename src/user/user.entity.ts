import { Column, Entity, OneToMany } from 'typeorm';
import { VideoEntity } from '../video/video.entity';
import { Base } from '../utils/base';
import { SubscriptionEntity } from './subscription.entity';
import { CommentEntity } from "../comment/comment.entity";

@Entity('User')
export class UserEntity extends Base {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ default: false, name: 'is_verified', nullable: false })
  isVerified: boolean;

  @Column({ default: 0, name: 'subscribers_count' })
  subscribersCount?: number;

  @Column({ default: null, type: 'text' })
  description: string;

  @Column({ default: null, name: 'avatar_path' })
  avatarPath: string;

  @OneToMany(() => VideoEntity, video => video.user)
  videos: VideoEntity[];

  @OneToMany(() => SubscriptionEntity, sub => sub.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, sub => sub.toChannel)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => CommentEntity, comment => comment.user)
  comments: CommentEntity[];
}