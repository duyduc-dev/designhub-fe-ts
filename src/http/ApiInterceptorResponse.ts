import moment from 'moment';

import authStore from '@/stores/auth/AuthStore.ts';
import GenericApi from '@/http/GenericApi';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpResponse } from '@/http/type.ts';
import { FunctionRequest } from '@/http/ApiInterceptorRequest.ts';

export default class ApiInterceptorResponse {
  api: GenericApi;
  modifiers: FunctionRequest[] = [];
  callbacks: FunctionRequest[] = [];
  constructor(api: GenericApi) {
    this.api = api;
    this.api.axiosInstance.interceptors.response.use(
      (res) => this.interceptorResponse(res, api) as any,
      (error) => this.rejectError(error, api),
    );
  }

  interceptorResponse(response: AxiosResponse<HttpResponse>, api: GenericApi) {
    if (api.logResponse) {
      console.info('-------------[ RESPONSE ]--------------');
      console.log(
        'URL',
        moment().format('HH:mm:ss'),
        response.request.responseURL,
      );
      console.log('Header', response.headers);
      console.log(
        '[Response]',
        ApiInterceptorResponse.#truncateLongBase64InObject(
          JSON.parse(JSON.stringify(response.data)),
        ),
      );
      console.info('-----------[ END RESPONSE ]------------');
    }
    return Promise.resolve(response.data);
  }

  rejectError(error: AxiosError<HttpResponse>, api: GenericApi) {
    const response = error.response;
    if (api.logResponse) {
      console.info('-------------[ RESPONSE ]--------------');
      console.log('[ERROR]', response?.data);
      console.info('-----------[ END RESPONSE ]------------');
    }
    const errorData = error.response?.data;
    switch (errorData?.description) {
      case 'Unauthorized':
      case 'UNAUTHORIZED':
        authStore.signOut();
        break;
    }
    return Promise.reject(errorData);
  }

  addModifier(callback: FunctionRequest) {
    this.modifiers.push(callback);
    return this;
  }

  addCallback(f: FunctionRequest) {
    this.callbacks.push(f);
    return this;
  }

  static #isBase64String(str: string) {
    return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
  }

  static #truncateBase64(str: string) {
    if (str.length > 20) {
      return str.substr(0, 10) + '....' + str.substr(-10);
    }
    return str;
  }

  static #truncateLongBase64InObject(obj: any): any {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && this.#isBase64String(obj[key])) {
          obj[key] = this.#truncateBase64(obj[key]);
        } else if (typeof obj[key] === 'object') {
          this.#truncateLongBase64InObject(obj[key]);
        }
      }
    }
    return obj;
  }
}
