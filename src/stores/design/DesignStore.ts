import { cloneDeep } from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';

import designApi from '@/services/design.ts';
import {
  DesignDetailResponse,
  DesignSizeUnit,
  SystemStatus,
  TLayer,
  TShape,
} from '@/services/type/design.ts';
import { sum } from '@/utils/helpers.ts';

class DesignStore implements DesignDetailResponse {
  width = 500;
  height = 500;
  unit = DesignSizeUnit.PIXEL;
  createdAt: Date = new Date();
  createdByUserId: string = '';
  design: TLayer[] = [];
  id: string = '';
  starred: boolean = false;
  systemStatus: SystemStatus = SystemStatus.INACTIVE;
  title: string = '';
  updatedAt: Date = new Date();

  currentLayerId: undefined | string;
  shapeSelectedId?: string;

  constructor() {
    makeAutoObservable(this);
  }

  get shapesCurrentLayer() {
    return (
      this.design.find((item) => item.id === this.currentLayerId)?.shapes || []
    );
  }

  get shapeSelected() {
    return this.shapesCurrentLayer.find(
      (item) => item.id === this.shapeSelectedId,
    );
  }

  get totalShapes(): number {
    return sum(...this.design.map((item) => item.shapes.length));
  }

  moveShape(oldIndex: number, newIndex: number) {
    const shape = this.shapesCurrentLayer[oldIndex];
    if (shape.rootLayer || newIndex === 0) return;
    const [removed] = this.shapesCurrentLayer.splice(oldIndex, 1);
    this.shapesCurrentLayer.splice(newIndex, 0, removed);
  }

  addShape(shape: TShape) {
    this.design.forEach((item) => {
      if (item.id === this.currentLayerId) {
        item.shapes?.push(shape);
      }
    });
  }

  removeShapeSelected() {
    const data = cloneDeep(this.shapeSelected);
    const index = this.shapesCurrentLayer.findIndex(
      (item) => item.id === this.shapeSelectedId && !item.rootLayer,
    );
    if (index > 0) {
      this.shapesCurrentLayer.splice(index, 1);
      this.shapeSelectedId = undefined;
    }
    return data;
  }

  async fetchDetailDesign(id: string) {
    const res = await designApi.fetchDesignById(id);
    runInAction(() => {
      this.id = res.id;
      this.width = res.width;
      this.height = res.height;
      this.unit = res.unit;
      this.createdAt = res.createdAt;
      this.updatedAt = res.updatedAt;
      this.createdByUserId = res.createdByUserId;
      this.systemStatus = res.systemStatus;
      this.design = res.design;
      this.title = res.title;
      this.currentLayerId = res.design?.[0]?.id;
    });
  }
}

const designStore = new DesignStore();

export default designStore;
