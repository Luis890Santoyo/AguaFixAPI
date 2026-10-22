import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { envs } from '../config/envs';

@Injectable()
export class StorageService {
  private readonly client = new S3Client({
    region: envs.awsRegion,
    credentials: {
      accessKeyId: envs.awsAccessKeyId,
      secretAccessKey: envs.awsSecretAccessKey,
    },
  });

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const key = `${folder.replace(/\/+$/, '')}/${randomUUID()}${extname(file.originalname)}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: envs.awsBucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `https://${envs.awsBucketName}.s3.${envs.awsRegion}.amazonaws.com/${key}`;
  }
}
