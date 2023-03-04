export interface AuthMeResponse<T> {
  readonly data: {
    user: {
      context: T;
    };
  };
}
