export class ObjectInfo {
  objectName: string;
  objectType: ObjectType;
}

export enum ObjectType {
  STAR = 'star',
  PLANETOID = 'planetoid',
  COMET = 'comet'
}
