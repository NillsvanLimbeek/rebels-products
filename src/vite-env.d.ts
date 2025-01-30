/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOCK_API: string;
  readonly VITE_PIXABAY_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
