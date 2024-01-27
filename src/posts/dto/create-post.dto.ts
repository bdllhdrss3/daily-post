import {
  IsString,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator'

export class CreatePostDto {
  @IsString()
  title: string

  @IsString()
  body: string

  @IsArray()
  tags: string[]

  @IsArray()
  images: object[]

  @IsOptional()
  isPrivate: boolean | any

  @IsOptional()
  ttl: number | null
}
