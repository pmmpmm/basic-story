/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_DB_URL: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_ACCESS_TOKEN: string;
  readonly VITE_FIREBASE_REFRESH_TOKEN: string;
  readonly VITE_ROLE: string;
  readonly VITE_CLOUDINARY_PRESET_NAME: string;
  readonly VITE_CLOUDINARY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
