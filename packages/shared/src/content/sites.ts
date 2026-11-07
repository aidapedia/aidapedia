// The apps only know each other by address. VITE_SITE_ROOT comes from BASE_PATH (see ../../vite.js).
export const AIDAPEDIA_URL: string = import.meta.env.VITE_SITE_ROOT
export const TABLETSGO_URL = `${AIDAPEDIA_URL}tabletsgo/`

/** The full address of an Aidapedia page, for reaching it from another app. */
export const aidapediaUrl = (page: string) => `${AIDAPEDIA_URL}${page.replace(/^\//, '')}`
