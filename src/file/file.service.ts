import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');

    const ext = path.extname(file.originalname);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const uniqueName = `${uuidv4()}${ext}`;

    const filePath = path.join(uploadDir, uniqueName);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);
    const url = 'http://localhost:8080/static/' + uniqueName;
    return {
      path: url,
      name: uniqueName,
    };
  }
}
