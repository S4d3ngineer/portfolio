export const BREAKPOINTS = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
};

export const QUERIES = {
  sm: `(min-width: ${BREAKPOINTS.sm})`,
  md: `(min-width: ${BREAKPOINTS.md})`,
  lg: `(min-width: ${BREAKPOINTS.lg})`,
  xl: `(min-width: ${BREAKPOINTS.xl})`,
  "2xl": `(min-width: ${BREAKPOINTS["2xl"]})`,
};

export const STARNDAR_IMAGE_SIZES_ATTRIBUTE = `90vw, ${QUERIES["2xl"]} 80vw`;
