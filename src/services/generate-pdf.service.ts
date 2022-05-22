/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import getStream from 'get-stream';
import PDFDocument from 'pdfkit';

@injectable({scope: BindingScope.TRANSIENT})
export class GeneratePdfService {
  constructor(/* Add @inject to inject parameters */) {}

  /**
   * Generate a PDF of the letter
   *
   * @returns {Buffer}
   */
  async GeneratePdf(): Promise<Buffer> {
    try {
      const doc = new PDFDocument();

      doc.fontSize(25).text('Test Sayfası!!!', 100, 100);
      // if (process.env.NODE_ENV === 'development') {
      //   doc.pipe(fs.createWriteStream(`${__dirname}/../file.pdf`));
      // }
      doc.end();
      const pdfStream = await getStream.buffer(doc);
      return pdfStream;
    } catch (error) {
      return Promise.reject(new HttpErrors[500]('Error generating PDF'));
    }
  }
}
