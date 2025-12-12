interface ImportMetaEnv{
    readonly VITE_LIBCAL_KEY: string,
    readonly VITE_CLIENT_ID: string
}

interface ImportMeta{
    readonly env: ImportMetaEnv
}