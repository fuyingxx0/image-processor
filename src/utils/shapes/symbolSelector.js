// symbolSelector.js

/**
 * Select a symbol based on the brightness of a block
 * @param {number} brightness - Brightness of the block (0 to 255).
 * @returns {string} Symbol to represent the block
 */
export function selectSymbol(brightness) {
  const symbolsLTD = ['.', '`', ',', ':', '-', '~', '+', '*', '?', '&', '#', '@'];
  const symbolsDTL = [...symbolsLTD].reverse();
  // Map brightness (0-255) to an index in the symbols array
  const index = Math.floor((brightness / 255) * (symbolsLTD.length - 1));
  return symbolsLTD[index];
}
