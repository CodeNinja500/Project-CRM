export interface LeadsResponse<T> {
  readonly data: {
    data: T;
  }[];
}
