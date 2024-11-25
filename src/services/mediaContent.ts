import { AxiosProgressEvent } from 'axios';

import { ApiRoutes } from '@/constants';
import HttpRequest from '@/http';
import GenericApi from '@/http/GenericApi.ts';

const mediaContentApi = {
  async getListImage() {
    try {
      const res = await HttpRequest.get(ApiRoutes.IMAGES_LIST);

      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },

  async uploadImage(
    file: FormData,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ) {
    const res = await HttpRequest.post(ApiRoutes.UPLOAD_IMAGE, file, {
      headers: {
        'Content-Type': GenericApi.CT_MULTIPART,
      },
      onUploadProgress: onUploadProgress,
    });
    return res.data;
  },
};

export default mediaContentApi;
