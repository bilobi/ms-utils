/* eslint-disable @typescript-eslint/naming-convention */
// Uncomment these imports to begin using these cool features!

import {inject, service} from '@loopback/core';
import {get, oas, param, Response, RestBindings} from '@loopback/rest';
import {GeneratePdfService} from '../services';

// import {inject} from '@loopback/core';

export class GeneratePdfController {
  constructor(
    @service(GeneratePdfService) public pdfKitService: GeneratePdfService,
  ) {}

  @get('/pdf/{filename}')
  @oas.response.file()
  async downloadDocument(
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const pdfKitService = this.pdfKitService;
    const pdfStream = await pdfKitService.GeneratePdf();

    response
      .writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfStream),
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${filename}.pdf`,
      })
      .end(pdfStream);
    return response;
  }
}
