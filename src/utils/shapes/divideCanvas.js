// divideCanvas.js
/**
 * Divide canvas into blocks based on block size and aspect ratio
 * @param {number} canvasWidth - Width of the canvas
 * @param {number} canvasHeight - Height of the canvas
 * @param {number} blockSize - Font size (determines block size)
 * @param {number} aspectRatio - Width-to-height ratio for the Courier font (e.g., 0.6)
 * @returns {Array} Array of block dimensions
 */

export function divideIntoBlocks(canvasWidth, canvasHeight, blockWidth, blockHeight) {
  
    const columns = Math.floor(canvasWidth / blockWidth);
    const rows = Math.floor(canvasHeight / blockHeight);
  
    const blocks = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        blocks.push({
          x: x * blockWidth,
          y: y * blockHeight,
          width: blockWidth,
          height: blockHeight
        });
      }
    }
  
    return blocks;
  }
  