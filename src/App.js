// src/App.js
import React, { useState } from 'react';
import SymbolPalette from './components/SymbolPalette';
import PixelArt from './components/PixelArt';
import { getColorPalette } from './assets/color'; // params: 'theme', 'type'; type: 'categorized' is json, 'gradient' is array
import './App.css';
import Select from './components/Select/Select';
import EdgeDetection from './components/EdgeDetection';
import Isoline from './components/Isoline';
import ConcentricMosaic from './components/ConcentricMosaic';

const App = () => {
  const canvasTypes = ['symbolPalette', 'pixelArt', 'edgeDetection', 'isoline', 'concentricMosaic'];
  const [selectedCanvas, setSelectedCanvas] = useState(canvasTypes[4]);

  // Shared parameters
  const imagePath = '/man.jpg';
  const canvasWidth = 1024;
  const canvasHeight = 768;
  
  // Symbol Palette specific
  const symbolFontSize = 20;
  const symbolAspectRatio = 0.6;
  const symbolColors = getColorPalette('hacker', 'categorized');
  const symbolSamplingInterval = 4;
  
  // Pixel Art specific
  const pixelSize = 8;
  const pixelColors = getColorPalette('default', 'gradient');
  const pixelSamplingInterval = 2;

  // Edge Detection specific
  const edgeThreshold = 70;
  const edgeSamplingInterval = 1;
  const edgeColors = getColorPalette('default', 'categorized');

  // Isoline specific
  const isolineDensity = 5;
  const isolineColors = getColorPalette('default', 'gradient');

  // Concentric Mosaic specific
  const mosaicGridSize = 40;
  const mosaicMinDensity = 1;
  const mosaicMaxDensity = 10;
  const densityInterval = 0.3;
  const mosaicColors = getColorPalette('default', 'gradient');

  const canvasOptions = [
    { value: 'symbolPalette', label: 'Symbol Palette' },
    { value: 'pixelArt', label: 'Pixel Art' },
    { value: 'edgeDetection', label: 'Edge Detection' },
    { value: 'isoline', label: 'Isoline' },
    { value: 'concentricMosaic', label: 'Concentric Mosaic' }
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
        {selectedCanvas === 'edgeDetection' && (
          <EdgeDetection 
            imagePath={imagePath}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            threshold={edgeThreshold}
            samplingInterval={edgeSamplingInterval}
            colors={edgeColors}
          />
        )}
        {selectedCanvas === 'isoline' && (
          <Isoline 
            imagePath={imagePath}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            colors={isolineColors}
            isolineDensity={isolineDensity}
          />
        )}
        {selectedCanvas === 'concentricMosaic' && (
          <ConcentricMosaic 
            imagePath={imagePath}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            gridSize={mosaicGridSize}
            minDensity={mosaicMinDensity}
            maxDensity={mosaicMaxDensity}
            densityInterval={densityInterval}
            colors={mosaicColors}
          />
        )}
      </div>
    </div>
  );
};

export default App;
