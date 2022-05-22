/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import path from 'path';
import {Configuration} from '../config/configuration';

@injectable({scope: BindingScope.TRANSIENT})
export class FileDownloadService {
  constructor(/* Add @inject to inject parameters */) {}

  /**
   * Get the folder when files are uploaded by type
   * @param type
   * @returns
   */

  GetFolderPathbyType(module: string, type: string): string {
    let folderPath = '';
    switch (type) {
      case 'image':
        folderPath = path.join(
          __dirname,
          `${Configuration.imageFolder}/${module}`,
        );
        break;
      case 'document':
        folderPath = path.join(
          __dirname,
          `${Configuration.documentsFolder}/${module}`,
        );
        break;
      default:
        folderPath = path.join(__dirname, Configuration.imageFolder);
        break;
    }
    return folderPath;
  }

  FileNameValidation(folder: string, fileName: string) {
    const resolved = path.resolve(folder, fileName);
    if (resolved.startsWith(folder)) return resolved;
    throw new HttpErrors.BadRequest(`Invalid file name: ${fileName}`);
  }
}
