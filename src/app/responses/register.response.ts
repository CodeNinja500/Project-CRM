export interface RegisterResponse {
  readonly data: {
    user: {
      emailVerified: false;
      stsTokenManager: {
        refreshToken: string;
        accessToken: string;
      };
    };
  };
}
