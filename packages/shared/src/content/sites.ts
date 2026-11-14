// The apps only know each other by address. Both come from AIDAPEDIA_URL / TABLETSGO_URL at
// build time (see ../../vite.js): paths on one shared site by default, full addresses when deployed apart.
export const AIDAPEDIA_URL: string = import.meta.env.VITE_AIDAPEDIA_URL
export const TABLETSGO_URL: string = import.meta.env.VITE_TABLETSGO_URL

/** The full address of an Aidapedia page, for reaching it from another app. */
export const aidapediaUrl = (page: string) => `${AIDAPEDIA_URL}${page.replace(/^\//, '')}`
