// src/App.js
import React, { useState } from 'react';
import SymbolPalette from './components/SymbolPalette';
import PixelArt from './components/PixelArt'
import { getColorPalette } from './assets/color';
import './App.css';
import Select from './components/Select/Select';

const App = () => {
  const canvasTypes = ['symbolPalette', 'pixelArt'];
  const [selectedCanvas, setSelectedCanvas] = useState(canvasTypes[0]);

  // Shared parameters
  const imagePath = '/man.jpg';
  const canvasWidth = 1024;
  const canvasHeight = 768;
  
  // Symbol Palette specific
  const symbolFontSize = 15;
  const symbolAspectRatio = 0.6;
  const symbolColors = getColorPalette('hacker', 'categorized');
  const symbolSamplingInterval = 4;
  
  // Pixel Art specific
  const pixelSize = 8;
  const pixelColors = getColorPalette('default', 'gradient');
  const pixelSamplingInterval = 2;

  const canvasOptions = [
    { value: 'symbolPalette', label: 'Symbol Palette' },
    { value: 'pixelArt', label: 'Pixel Art' }
  ];

  return (
    <div className="canvas-container">
      <div className="canvas-controls">
        <Select 
          value={selectedCanvas}
          onChange={(value) => setSelectedCanvas(value)}
          options={canvasOptions}
        />
      </div>

      <div className="canvas-wrapper">
        {selectedCanvas === 'symbolPalette' && (
          <SymbolPalette 
            imagePath={imagePath}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            fontSize={symbolFontSize}
            aspectRatio={symbolAspectRatio}
            colors={symbolColors}
            samplingInterval={symbolSamplingInterval}
        />
        )}
        {selectedCanvas === 'pixelArt' && (
          <PixelArt 
            imagePath={imagePath}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            pixelSize={pixelSize}
            colors={pixelColors}
            samplingInterval={pixelSamplingInterval}
          />
        )}
      </div>
    </div>
  );
};

export default App;
