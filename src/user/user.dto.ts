import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  avatarPath: string;

  @IsOptional()
  password?: string;
}