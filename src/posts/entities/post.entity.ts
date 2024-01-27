import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Post extends Model<Post> {
  @Column
  title: string;

  @Column
  body: string;

  @Column(DataType.ARRAY(DataType.STRING))
  tags: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  imageUrls: string[];

  @Column
  isPrivate: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  deletedAt: Date;

  @Column(DataType.DATE)
  ttl: Date;
}
