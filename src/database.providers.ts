/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT as 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // This line is added to accept self-signed certificates
          },
        },
      });
      sequelize.addModels([User, Post]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
