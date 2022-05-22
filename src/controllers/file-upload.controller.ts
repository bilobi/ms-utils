/* eslint-disable @typescript-eslint/naming-convention */
import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import path from 'path';
import {Configuration} from '../config/configuration';
import {Document} from '../models';
import {DocumentRepository} from '../repositories';
import {FileUploadService} from '../services/file-upload.service';

export class FileUploadController {
  constructor(
    @service(FileUploadService)
    public fileUploadService: FileUploadService,
    @repository(DocumentRepository)
    private documentRepository: DocumentRepository,
  ) {}
  @post('/upload/{type}/{module}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
          description: 'File upload',
        },
      },
    },
  })
  async upload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    //@param.path.string('module') module: string,
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
    @param({
      name: 'id',
      in: 'query',
      description: 'Module record id',
      required: false,
      schema: {type: 'string'},
    })
    id: string,
    @param({
      name: 'description',
      in: 'query',
      description: 'Uploaded file description',
      required: false,
      schema: {type: 'string'},
    })
    description: string,
  ): Promise<object | false> {
    const folder =
      type === 'image'
        ? Configuration.imageFolder
        : Configuration.documentsFolder;
    const docpath = path.join(__dirname, `${folder}/${module}`);

    const acceptedExtensions =
      type === 'image'
        ? Configuration.extensionAllowedImage
        : Configuration.extensionAllowedDocument;
    const fieldname =
      type === 'image'
        ? Configuration.nameFieldImageUser
        : Configuration.nameFieldDocumentUser;
    console.log(docpath, acceptedExtensions, fieldname);
    const res = await this.fileUploadService.StoreFilePath(
      docpath,
      fieldname,
      request,
      response,
      acceptedExtensions,
    );
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        const document = new Document();
        document.destinationId = id ?? '';
        document.module = module;
        document.type = type;
        document.name = filename;
        document.description = description ?? '';
        await this.documentRepository.save(document);
        return {
          filename,
        };
      }
    }
    return res;
  }
}
