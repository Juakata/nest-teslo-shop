declare namespace NodeJS {
  interface ProcessEnv {
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
  }
}
