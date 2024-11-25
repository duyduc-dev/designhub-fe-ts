export enum DesignSizeUnit {
  PIXEL = 'px',
  CENTIMETER = 'cm',
  MILLIMETER = 'mm',
  INCHES = 'in',
}

export type DesignNewRequest = {
  width: number;
  height: number;
  unit: DesignSizeUnit;
};

export enum SystemStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type DesignDetailResponse = {
  id: string;
  width: number;
  height: number;
  unit: DesignSizeUnit;
  title: string;
  starred: boolean;
  createdByUserId: string;
  createdAt: Date;
  updatedAt: Date;
  systemStatus: SystemStatus;
  design: TLayer[];
};

export type TLayer = {
  shapes: TShape[];
  id: string;
};

export type TShape = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ShapeType;
  fill?: string;
  name?: string;
  url?: string;
  text?: string;
  elementId?: string;
  draggable?: boolean;
  rootLayer?: boolean;
  cornerRadius?: number | number[];
};

export enum ShapeType {
  RECTANGLE = 'RECTANGLE',
  CIRCLE = 'CIRCLE',
  ROUNDED_RECTANGLE = 'ROUNDED_RECTANGLE',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}
