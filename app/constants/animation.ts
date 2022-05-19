export const transition = { duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] };

export const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
};
export const fadeUpVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};
export const fadeLeftVariant = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};
export const fadeRightVariant = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};
