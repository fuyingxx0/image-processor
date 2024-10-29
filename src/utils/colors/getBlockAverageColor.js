// getBlockAverageColor.js
import { calculateAverageColor } from './averageColor';
/**
 * Collects and averages the color of pixels in a block, sampling every `k` pixels to improve performance.
 * @param {p5.Image} img - The image to sample pixels from.
 * @param {Object} block - The block with { x, y, width, height } defining its position and size.
 * @param {number} k - Sampling interval. For example, k=2 means every other pixel.
 * @returns {Object} Average color { r, g, b } for the sampled pixels.
 */
export function getBlockAverageColor(img, block, k = 1) {
  const blockPixels = [];

  for (let y = block.y; y < block.y + block.height; y += k) {
    for (let x = block.x; x < block.x + block.width; x += k) {
      const pixel = img.get(x, y); // Get color at (x, y)
      blockPixels.push(pixel.slice(0, 3)); // Store RGB only
    }
  }

  return calculateAverageColor(blockPixels);
}
