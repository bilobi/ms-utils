import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Document, DocumentRelations} from '../models';

export class DocumentRepository extends DefaultCrudRepository<
  Document,
  typeof Document.prototype._id,
  DocumentRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Document, dataSource);
  }
}
