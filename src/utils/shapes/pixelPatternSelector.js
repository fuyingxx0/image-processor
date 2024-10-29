// pixelPatternSelector.js

const patterns = [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 1],
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 1],
      [1, 0, 0, 0]
    ],
    [
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [1, 0, 1, 0]
    ],
    [
      [0, 1, 0, 1],
      [1, 0, 1, 1],
      [0, 1, 0, 1],
      [1, 1, 1, 0]
    ],
    [
      [0, 1, 0, 1],
      [1, 1, 1, 1],
      [0, 1, 0, 1],
      [1, 1, 1, 1]
    ],
    [
      [1, 1, 0, 1],
      [1, 1, 1, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 1]
    ]
  ];
  
/**
 * Selects a pattern and color combination based on brightness.
 * @param {number} brightness - Brightness of the block (0 to 255).
 * @param {Array} palette - Array of colors from darkest to lightest.
 * @param {PosX} int - X coordinate of the pixel in the block
 * @param {PosY} int - Y coordinate of the pixel in the block
 * @returns {string} Color of the pixel.
 */
export function pixelPatternSelector(brightness, palette, PosX, PosY) {
    const numPatterns = patterns.length;
    const numColors = palette.length;
    const numCombos = numPatterns * (numColors - 1) + 1;

    const combo = Math.floor((brightness / 255) * numCombos);
    const colorIndex = Math.floor(combo / numPatterns);
    const patternIndex = combo % numPatterns;

    if(patterns[patternIndex][PosY][PosX]) return palette[colorIndex];
    else return palette[colorIndex + 1];

}
  