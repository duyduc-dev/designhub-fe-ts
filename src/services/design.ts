import { ApiRoutes } from '@/constants';
import HttpRequest from '@/http';
import {
  DesignDetailResponse,
  DesignNewRequest,
} from '@/services/type/design.ts';
import { dynamicRoute } from '@/utils/helpers';

const designApi = {
  async createDesign(data: DesignNewRequest) {
    try {
      const res = await HttpRequest.post(ApiRoutes.DESIGN, data);
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },

  async fetchDesignById(id: string) {
    try {
      const res = await HttpRequest.get<DesignDetailResponse>(
        dynamicRoute(ApiRoutes.DESIGN_DETAIL, { id }),
      );
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },

  async fetchRecentDesign() {
    try {
      const res = await HttpRequest.get<DesignDetailResponse[]>(
        dynamicRoute(ApiRoutes.RECENT_DESIGNS),
      );
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

export default designApi;
