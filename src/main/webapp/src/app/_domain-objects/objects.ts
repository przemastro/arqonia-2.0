export class ObjectInfo {
  objectName: string;
  objectType: ObjectType;

  constructor(objectName: string, objectType: ObjectType) {
    this.objectName = objectName;
    this.objectType = objectType;
  }
}

export enum ObjectType {
  STAR = 'star',
  PLANETOID = 'planetoid',
  COMET = 'comet'
}
