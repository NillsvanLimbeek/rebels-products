export type ExtractRouteParams<T extends string> = string extends T
  ? Record<string, string>
  : T extends `${string}{${infer Param}}${infer Rest}`
    ? { [K in Param]: string } & ExtractRouteParams<Rest>
    : Record<string, never>;
