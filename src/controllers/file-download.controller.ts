/* eslint-disable @typescript-eslint/naming-convention */
import {inject, service} from '@loopback/core';
import {get, oas, param, Response, RestBindings} from '@loopback/rest';
import fs from 'fs';
import {promisify} from 'util';
import {FileDownloadService} from '../services';

const readdir = promisify(fs.readdir);

export class FileDownloadController {
  constructor(
    @service(FileDownloadService)
    public fileDownloadSerrvice: FileDownloadService,
  ) {}

  @get('/documents/{type}/{module}', {
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          description: 'A list of files',
        },
      },
    },
  })
  async listDocuments(
    @param({
      name: 'type',
      in: 'path',
      description: 'Type of resource group',
      required: true,
      schema: {type: 'string', enum: ['document', 'image']},
    })
    type: string,
    @param({
      name: 'module',
      in: 'path',
      description: 'Module group',
      required: true,
      schema: {type: 'string', enum: ['users', 'items']},
    })
    module: string,
  ) {
    const documentsPath = this.fileDownloadSerrvice.GetFolderPathbyType(
      module,
      type,
    );
    const documents = await readdir(documentsPath);
    return documents;
  }

  /**
   * @param type
   * @param recordId
   * @param response
   */

  @get('/documents/{type}/{module}/{filename}')
  @oas.response.file()
  async downloadDocument(
    @param({
      name: 'type',
      in: 'path',
      description: 'Type of resource group',
      required: true,
      schema: {type: 'string', enum: ['document', 'image']},
    })
    type: string,
    @param({
      name: 'module',
      in: 'path',
      description: 'Module group',
      required: true,
      schema: {type: 'string', enum: ['users', 'items']},
    })
    module: string,
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const filePath = this.fileDownloadSerrvice.GetFolderPathbyType(
      module,
      type,
    );
    const file = this.fileDownloadSerrvice.FileNameValidation(
      filePath,
      filename,
    );
    response.download(file, filename);
    return response;
    // response.download(filePath, file);
    // return response;
  }
}
