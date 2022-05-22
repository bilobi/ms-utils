/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors, Request, Response} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Configuration} from '../config/configuration';

@injectable({scope: BindingScope.TRANSIENT})
export class FileUploadService {
  constructor(/* Add @inject to inject parameters */) {}

  /***
   * Return a config for mutler storage
   * @param path
   **/

  private GetMutlerStorageConfig(path: string) {
    let filename = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`; ///`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  /**
   * storage file in a specific path
   * @param storePath
   * @param request
   * @param response
   */

  async StoreFilePath(
    storePath: string,
    fieldName: string,
    request: Request,
    response: Response,
    acceptedExtensions: string[],
  ): Promise<object> {
    return new Promise((resolve, reject) => {
      const storage = this.GetMutlerStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
          const ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExtensions.includes(ext)) {
            return cb(null, true);
          }
          return cb(new HttpErrors[400]('Extension not allowed'));
        },
        limits: {
          fileSize: Configuration.imageMaxSize,
        },
      }).single(fieldName);
      upload(request, response, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({response});
        }
      });
    });
  }
}
