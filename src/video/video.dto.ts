import { IsOptional, IsString } from "class-validator";

export class VideoDto {
  @IsString()
  name: string;

  @IsOptional()
  isPublic?: boolean;

  @IsString()
  description: string;

  @IsString()
  videoPath: string;

  @IsString()
  thumbnailPath: string;
}