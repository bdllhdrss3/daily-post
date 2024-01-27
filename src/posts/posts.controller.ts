import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../users/auth.guard';
import { FormDataRequest } from 'nestjs-form-data';
import { CloudinaryService } from './cloudinary.service';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post()
  @FormDataRequest()
  async create(@Req() req, @Body() createPostDto: CreatePostDto) {
    //upload images
    const images: string[] = [];

    for (const image of createPostDto.images) {
      try {
        const upload = await this.cloudinaryService.uploadFile(image as any);
        images.push(upload.url as string);
      } catch (error) {
        throw new Error(`Error uploading image: ${error.message}`);
      }
    }
    const userId = req.user.userid;
    // createPostDto.images = images;
    return PostsService.create(userId, createPostDto, images);
  }

  @Get('myposts')
  findMyPosts(@Req() req) {
    const userId = req.user.userid;
    return PostsService.findMyPosts(userId);
  }
  @Get()
  findAll(@Req() req) {
    const userId = req.user.userid;
    return PostsService.findAll(userId);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userid;
    return PostsService.deletePost(id as unknown as number, userId);
  }

  @Patch('/togglePrivacy/:id')
  togglePrivacy(@Param('id') postId: number, @Req() req: any) {
    const userId = req.user.userid;
    return PostsService.togglePrivacy(postId, userId);
  }
}
