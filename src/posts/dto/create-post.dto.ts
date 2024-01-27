import {
  IsString,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsArray()
  tags: string[];

  @IsArray()
  images: object[];

  @IsOptional()
  @IsBoolean()
  isPrivate: boolean;

  @IsOptional()
  @IsNumber()
  ttl: number | null;
}
