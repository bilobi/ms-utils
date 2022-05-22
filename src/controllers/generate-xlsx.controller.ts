/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
// Uncomment these imports to begin using these cool features!

import {inject, service} from '@loopback/core';
import {get, oas, param, Response, RestBindings} from '@loopback/rest';
import {GenerateXlsxService} from '../services';

const Excel = require('exceljs');
// import {inject} from '@loopback/core';

export class GenerateXlsxController {
  constructor(
    @service(GenerateXlsxService) public xlsxService: GenerateXlsxService,
  ) {}
  @get('/xlsx/{filename}')
  @oas.response.file()
  async downloadDocument(
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const workbook = await this.xlsxService.GenerateXlsx(new Excel.Workbook());

    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `${filename}.xlsx`,
    );
    await workbook.xlsx.write(response);
    response.end();
    return response;
  }
}
