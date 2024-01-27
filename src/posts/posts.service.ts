import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { Op } from 'sequelize'
import { Post } from './entities/post.entity'
import { User } from 'src/users/entities/user.entity'
import { isNumber } from 'class-validator'

@Injectable()
export class PostsService {
  static async create(
    userId: number,
    createPostDto: CreatePostDto,
    images: string[],
  ) {
    const currentTimestamp = new Date().getTime()
    const MINUTE: number = 60000

    const Timestamp =
      typeof createPostDto.ttl === 'number'
        ? new Date(currentTimestamp + createPostDto.ttl * MINUTE)
        : null

    const postData = {
      userId,
      title: createPostDto.title,
      body: createPostDto.body,
      tags: createPostDto.tags,
      imageUrls: [...images],
      isPrivate: Boolean(createPostDto.isPrivate)
        ? createPostDto.isPrivate
        : false,
      ttl: Timestamp,
    }

    return await Post.create(postData)
  }

  static async findMyPosts(userId: number): Promise<any> {
    await Post.destroy({
      where: {
        deletedAt: {
          [Op.and]: [
            { [Op.lt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) },
          ],
        },
      },
    })
    const posts = await Post.findAll({
      where: {
        userId,
        deletedAt: {
          [Op.or]: [
            null,
            { [Op.gte]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) },
          ],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'gender'],
        },
      ],
    })

    return { posts }
  }

  static async findAll(userId: number) {
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { userId: userId },
          {
            [Op.and]: [{ isPrivate: false }, { userId: { [Op.ne]: userId } }],
          },
        ],
        deletedAt: {
          [Op.or]: {
            [Op.eq]: null,
          },
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'gender'],
        },
      ],
    })

    return { posts }
  }

  static async deletePost(postId: number, userId: number): Promise<any> {
    // Check if the post exists and belongs to the user
    const post = await Post.findOne({
      where: { id: postId, userId },
    })
    if (!post) {
      throw new NotFoundException(
        'Post not found or you are not authorized to delete this post.',
      )
    }

    if (post.deletedAt) {
      await post.destroy()
    } else {
      post.deletedAt = new Date()
      await post.save()
    }
    return { message: 'post deleted succesfully' }
  }
  static async togglePrivacy(postId: number, userId: number): Promise<Post> {
    const post = await Post.findOne({
      where: { id: postId, userId },
    })
    if (!post) {
      throw new NotFoundException(
        'Post not found or you are not authorized to update this post.',
      )
    }

    post.isPrivate = !post.isPrivate

    await post.save()

    return post
  }
}
