import qs from 'qs';

import GenericApi from '@/http/GenericApi.ts';

const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

const HttpRequest = new GenericApi({
  baseURL: `${BASE_URL}/api`,
  paramsSerializer: (params: any) => qs.stringify(params),
});

export default HttpRequest;
