/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_DEV: string;
    readonly VITE_SERVER_PROD: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
