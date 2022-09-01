import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IUpload {
  files: FileUpload[];
}

@Injectable()
export class FilesService {
  async upload({ files }: IUpload) {
    const bucket = 'off-board-storage';
    const storage = new Storage({
      projectId: 'off-service',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    const imageFiles = await Promise.all(files);
    const imageUrls = await Promise.all(
      imageFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`${bucket}/${el.filename}`))
            .on('error', () => reject('실패'));
        });
      }),
    );
    return imageUrls;
  }
}
