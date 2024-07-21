/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_DEV: string;
    readonly VITE_SERVER_PROD: string;
    readonly VITE_SERVER_DEFAULT_TOURNAMENT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
