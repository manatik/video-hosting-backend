import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { getJwtConfig } from "../config/jwt.config";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}
