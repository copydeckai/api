import { GetPublicKeyOrSecret, Secret } from 'jwt-promisify'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
	  JWT: Secret | GetPublicKeyOrSecret;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}

export {};