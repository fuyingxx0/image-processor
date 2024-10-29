// averageColor.js
/**
 * Calculate the average color of a block
 * @param {Array} pixels - Array of pixel colors in RGBA format for a specific block.
 * @returns {Object} { r, g, b } average color
 */

export function calculateAverageColor(pixels) {
    let totalR = 0, totalG = 0, totalB = 0;
  
    pixels.forEach(([r, g, b]) => {
      totalR += r;
      totalG += g;
      totalB += b;
    });
  
    const count = pixels.length;
  
    return {
      r: Math.floor(totalR / count),
      g: Math.floor(totalG / count),
      b: Math.floor(totalB / count),
    };
  }
  