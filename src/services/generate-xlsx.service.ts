/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';

@injectable({scope: BindingScope.TRANSIENT})
export class GenerateXlsxService {
  constructor(/* Add @inject to inject parameters */) {}

  /**
   * Generate a PDF of the letter
   *
   * @returns {Buffer}
   */
  async GenerateXlsx(workbook: any) {
    try {
      //
      workbook.creator = 'Me';
      workbook.lastModifiedBy = 'Her';
      workbook.created = new Date(1985, 8, 30);
      workbook.modified = new Date();
      workbook.lastPrinted = new Date(2016, 9, 27);
      workbook.properties.date1904 = true;

      workbook.views = [
        {
          x: 0,
          y: 0,
          width: 10000,
          height: 20000,
          firstSheet: 0,
          activeTab: 1,
          visibility: 'visible',
        },
      ];
      const worksheet = workbook.addWorksheet('My Sheet');
      worksheet.columns = [
        {header: 'Id', key: 'id', width: 10},
        {header: 'Name', key: 'name', width: 32},
        {
          header: 'D.O.B.',
          key: 'dob',
          width: 10,
          outlineLevel: 1,
          type: 'date',
          formulae: [new Date(2016, 0, 1)],
        },
      ];

      worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970, 1, 1)});
      worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
      return workbook;
    } catch (error) {
      return new HttpErrors[500](`Error generating Xlsx : ${error}`);
    }
  }
}
