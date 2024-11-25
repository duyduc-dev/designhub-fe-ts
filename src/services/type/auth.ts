import { SystemStatus } from '@/services/type/common.ts';

export type AuthLoginRequest = {
  type: AuthStep;
  email: string;
  name?: string;
  otp?: string;
};

export enum AuthStep {
  EMAIL = 'EMAIL',
  NAME = 'NAME',
  OTP = 'OTP',
  COMPLETED = 'COMPLETED',
}

export type AuthResponse = {
  nextStep?: AuthStep;
  accessToken?: string;
};

export type JwtPayloadDecoded = {
  id: string;
  email: string;
  fullName: string;
  iat: number;
  exp: number;
};

export type AuthInfoResponse = {
  id: string;
  fullName: string;
  email: string;
  systemStatus: SystemStatus;
};
