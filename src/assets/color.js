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
    background: '#F5F5F5', // Soft off-white background
    text: '#333333',       // Dark gray for text, softer than black
    main: '#5A9BD4',       // Soft, muted blue for main elements
    accent: '#FF6F61',     // Warm coral for accents
    secondary: '#A0A0A0',  // Medium gray for secondary elements
  }  
};

const gradientColorPalettes = {
  default: [
    '#343131', '#A04747' , '#D8A25E', //'#EEDF7A'
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
