import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

@Injectable()
export class CloudinaryService {
  async uploadFile(file: any): Promise<any> {
    if (!file || !file.buffer) {
      throw new Error('Invalid file object');
    }
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(file.buffer);
    });
  }
}
