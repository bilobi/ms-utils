import {Entity, model, property} from '@loopback/repository';

@model()
export class Document extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    enum: ['image', 'document'],
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    enum: ['user', 'item'],
    required: true,
  })
  module: string;

  @property({
    type: 'string',
    required: true,
  })
  destinationId: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    default: '',
  })
  description?: string;

  constructor(data?: Partial<Document>) {
    super(data);
  }
}

export interface DocumentRelations {
  // describe navigational properties here
}

export type DocumentWithRelations = Document & DocumentRelations;
