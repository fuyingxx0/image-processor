// ConcentricMosaic.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { getBlockAverageColor } from '../utils/colors/getBlockAverageColor';
import { calculateBrightness } from '../utils/colors/calculateHSV';

const P5Canvas = ({ 
  imagePath,
  canvasWidth = 1024,
  canvasHeight = 768,
  colors,
  gridSize = 16,            // Size of each square cell
  minDensity = 1,           // Minimum density for light areas
  maxDensity = 1,           // Maximum density for dark areas
  densityInterval = 0.5     // The interval between different density values
}) => {
  const canvasRef = useRef();
  const colorBackground = colors[colors.length - 1] || colors.background;
  const colorStroke = colors[0] || colors.text;

  useEffect(() => {
    const p5Instance = new p5(sketch, canvasRef.current);
    return () => p5Instance.remove();
  }, []);

  const sketch = (p) => {
    let img;

    p.preload = () => {
      img = p.loadImage(imagePath);
    };

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
      p.background(colorBackground);
      p.stroke(colorStroke);
      p.noFill();
    };

    p.draw = () => {
      img.loadPixels();

      for (let y = 0; y < img.height; y += gridSize) {
        for (let x = 0; x < img.width; x += gridSize) {
          // Get the average color and brightness of the current cell
          const avgColor = getBlockAverageColor(img, { x, y, width: gridSize, height: gridSize });
          const brightness = calculateBrightness(avgColor);
          // Map brightness to density (higher brightness -> lower density)
          const rawDensity = p.map(brightness, 0, 255, maxDensity, minDensity);
          const density = Math.floor(rawDensity / densityInterval) * densityInterval;
          // Draw squares based on density
          for (let d = 0; d < density; d++) {
            const offset = (d / density) * gridSize;
            p.rect(x + offset, y + offset, gridSize - 2 * offset, gridSize - 2 * offset);
          }
        }
      }
    };
  };

  return <div ref={canvasRef}></div>;
};

export default P5Canvas;
