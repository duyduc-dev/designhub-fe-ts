import { ApiRoutes } from '@/constants';
import HttpRequest from '@/http';
import {
  AuthInfoResponse,
  AuthLoginRequest,
  AuthResponse,
} from '@/services/type/auth.ts';

const authApi = {
  async login(data: AuthLoginRequest) {
    const res = await HttpRequest.post<AuthResponse, AuthLoginRequest>(
      ApiRoutes.AUTH,
      data,
    );
    return res.data;
  },

  async getAuthInfo() {
    const res = await HttpRequest.get<AuthInfoResponse>(ApiRoutes.AUTH_INFO);
    return res.data;
  },

  async googleLogin(token: string) {
    const res = await HttpRequest.post<AuthResponse>(ApiRoutes.GOOGLE_AUTH, {
      token,
    });
    return res.data;
  },

  async googleOneTapLogin(token: string) {
    const res = await HttpRequest.post<AuthResponse>(
      ApiRoutes.GOOGLE_ONE_TAP_AUTH,
      {
        token,
      },
    );
    return res.data;
  },
};

export default authApi;
