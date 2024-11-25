import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { AuthInfoResponse } from '@/services/type/auth.ts';

class AuthStore {
  accessToken: string | null = null;
  currentUser?: AuthInfoResponse;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'AuthStore',
      properties: ['accessToken'],
      storage: window.localStorage,
    });
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setCurrentUser(user: AuthInfoResponse) {
    this.currentUser = user;
  }

  signOut() {
    this.accessToken = null;
    this.currentUser = undefined;
  }
}

const authStore = new AuthStore();

export default authStore;
