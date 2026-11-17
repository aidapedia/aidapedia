/** Whether the visitor asked for less motion. Read at the moment it matters, so a change in settings applies on the next run. */
export const prefersStill = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
