// calculateHSV.js

/**
 * Calculate brightness from RGB
 * @param {Object} color - { r, g, b } average color object
 * @returns {number} Brightness value
 */
export function calculateBrightness({ r, g, b }) {
  return 0.299 * r + 0.587 * g + 0.114 * b; // standard luminance formula
}

/**
 * Calculate hue from RGB
 * @param {Object} color - { r, g, b } average color object
 * @returns {number} Hue value (0 to 360)
 */
export function calculateHue({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue;

  if (max === min) {
    hue = 0; // achromatic
  } else if (max === r) {
    hue = (60 * ((g - b) / (max - min)) + 360) % 360;
  } else if (max === g) {
    hue = (60 * ((b - r) / (max - min)) + 120) % 360;
  } else {
    hue = (60 * ((r - g) / (max - min)) + 240) % 360;
  }

  return hue;
}

/**
 * Calculate saturation from RGB
 * @param {Object} color - { r, g, b } average color object
 * @returns {number} Saturation value (0 to 1)
 */
export function calculateSaturation({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  if (max === 0) return 0; // To prevent division by zero

  return (max - min) / max;
}

/**
 * Calculate HSV (hue, saturation, brightness) from RGB
 * @param {Object} color - { r, g, b } average color object
 * @returns {Object} { hue, saturation, brightness }
 */
export function calculateHSV(color) {
  const brightness = calculateBrightness(color) / 255; // Normalize brightness to 0-1
  const hue = calculateHue(color);
  const saturation = calculateSaturation(color);

  return { hue, saturation, brightness };
}
