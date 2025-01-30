import { ExtractRouteParams } from "./ExtractRouteParams";

export type RequestConfig<T extends string> = RequestInit & {
  params?: ExtractRouteParams<T>;
};
