import {DBConfig} from "ngx-indexed-db";

export const dbConfig: DBConfig = {
  name: 'TodoDB',
  version: 1,
  objectStoresMeta: [{
    store: 'todos',
    storeConfig: {
      keyPath: 'id',
      autoIncrement: true
    },
    storeSchema: [
      { name: 'title', keypath: 'title', options: { unique: false } },
      { name: 'status', keypath: 'status', options: { unique: false } },
      { name: 'statusText', keypath: 'statusText', options: { unique: false } },
      { name: 'description', keypath: 'description', options: { unique: false } }
    ]
  }]
};
