// color.js

const categorizedColorPalettes = {
  autumn: {
    background: '#FFFAF0', // Light beige
    text: '#8B4513',       // Saddle brown
    main: '#FF4500',       // Orange red
    accent: '#DAA520',     // Goldenrod
    secondary: '#CD5C5C',  // Indian red
  },
  hacker: {
    background: '#000000', // Black background
    text: '#00FF00',       // Bright green text
    main: '#00FF00',       // Green as the main color
    accent: '#00CC00',     // Darker green accent
    secondary: '#003300',  // Very dark green as secondary
  },
  default: {
    background: '#FFFFFF', // White
    text: '#000000',       // Black
    main: '#007ACC',       // Blue
    accent: '#00A3E0',     // Light blue
    secondary: '#CCCCCC',  // Light gray
  }
};

const gradientColorPalettes = {
  default: [
    '#A04747', '#343131', '#D8A25E', '#EEDF7A'
  ]
}

/**
* Returns a color palette based on the provided style.
* @param {string} style - The style name, like "autumn".
* @returns {Object} Color palette with background, text, main, accent, and secondary colors.
*/
export function getColorPalette(style = 'default', type = 'categorized') {
  if (type === 'gradient'){
    return gradientColorPalettes[style] || gradientColorPalettes.default
  }
  return categorizedColorPalettes[style] || categorizedColorPalettes.default;
}
