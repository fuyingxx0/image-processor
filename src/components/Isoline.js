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
  gridSize = 35,           // Size of each marching square cell
  minDensity = 2,           // Minimum density for light areas
  maxDensity = 10           // Maximum density for dark areas
}) => {
  const canvasRef = useRef();

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
      p.background(colors.background || 255);
      p.stroke(colors.stroke || 0);
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
          const density = p.map(brightness, 0, 255, maxDensity, minDensity);
          
          // Draw isolines based on density
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
