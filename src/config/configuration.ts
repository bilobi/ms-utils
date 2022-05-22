/* eslint-disable @typescript-eslint/naming-convention */
export namespace Configuration {
  export const documentsFolder = '../../assets/documents';
  export const imageFolder = '../../assets/images';
  export const imageMaxSize = 1024 * 1024;
  export const extensionAllowedImage = ['.PNG', '.JPG', '.JPEG', '.GIF'];
  export const extensionAllowedDocument = [
    '.PDF',
    '.DOC',
    '.DOCX',
    '.XLS',
    '.XLSX',
  ];
  export const nameFieldImageUser = 'file';
  export const nameFieldDocumentUser = 'file';

  export enum type {
    image = 'image',
    document = 'document',
  }

  export enum module {
    user = 'user',
    item = 'item',
  }
}
