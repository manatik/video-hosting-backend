import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { SubscriptionEntity } from "./subscription.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SubscriptionEntity])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
}
