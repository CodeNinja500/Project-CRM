export interface AuthMeResponse<T> {
  readonly data: {
    user: T;
  };
}
