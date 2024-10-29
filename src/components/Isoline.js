// Isoline.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Canvas = ({ 
  imagePath,
  canvasWidth,
  canvasHeight,
  colors,
  contourInterval = 20,       // Interval for drawing each contour line
  terrainNoiseScale = 5,    // Scale for the primary terrain noise
  brightnessNoiseScale = 0.5, // Scale for brightness-based noise influence
  zScale = 80,                // Height scale for `z` values based on brightness
  gridSize = 12               // Interval in pixels for calculating `z` values
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const p5Instance = new p5(sketch, canvasRef.current);
    return () => p5Instance.remove();
  }, []);

  const sketch = (p) => {
    let img;
    let zValues = [];

    p.preload = () => {
      img = p.loadImage(imagePath);
    };

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
      p.background(colors[2]);

      img.loadPixels();

      // Calculate `z` values on the grid
      for (let y = 0; y < img.height; y += gridSize) {
        let row = [];
        for (let x = 0; x < img.width; x += gridSize) {
          const idx = (y * img.width + x) * 4;
          const r = img.pixels[idx];
          const g = img.pixels[idx + 1];
          const b = img.pixels[idx + 2];

          const brightness = (r + g + b) / 3 / 255;
          const mappedZ = p.map(brightness, 0, 1, zScale, 0);

          // Generate terrain and brightness-based noise
          const terrainNoiseVal = p.noise(x * terrainNoiseScale, y * terrainNoiseScale);
          const brightnessNoiseVal = p.noise(x * brightnessNoiseScale, y * brightnessNoiseScale);

          // Calculate `zValue` with both noise influences
          const zValue = terrainNoiseVal + mappedZ * brightnessNoiseVal;
          row.push(zValue);
        }
        zValues.push(row);
      }
    };

    p.draw = () => {
      // Draw interpolated contours between grid points
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          // Find the closest grid points
          const x0 = Math.floor(x / gridSize);
          const y0 = Math.floor(y / gridSize);

          // Calculate the interpolation weights
          const xWeight = (x % gridSize) / gridSize;
          const yWeight = (y % gridSize) / gridSize;

          // Get the four surrounding `z` values
          const z00 = zValues[y0][x0];
          const z10 = x0 + 1 < zValues[0].length ? zValues[y0][x0 + 1] : z00;
          const z01 = y0 + 1 < zValues.length ? zValues[y0 + 1][x0] : z00;
          const z11 = (x0 + 1 < zValues[0].length && y0 + 1 < zValues.length) ? zValues[y0 + 1][x0 + 1] : z00;

          // Bilinear interpolation for the current pixel's `z` value
          const zInterpolated = 
            z00 * (1 - xWeight) * (1 - yWeight) +
            z10 * xWeight * (1 - yWeight) +
            z01 * (1 - xWeight) * yWeight +
            z11 * xWeight * yWeight;

          // Calculate gradient (approximate steepness) based on neighboring grid points
          const gradientX = (z10 - z00) * (1 - yWeight) + (z11 - z01) * yWeight;
          const gradientY = (z01 - z00) * (1 - xWeight) + (z11 - z10) * xWeight;
          const gradientMagnitude = Math.sqrt(gradientX ** 2 + gradientY ** 2);

          // Map gradient to stroke weight for contour thickness
          const maxStrokeWeight = 4; // Maximum thickness for steep regions
          const minStrokeWeight = 1; // Minimum thickness for flat regions
          const strokeWeight = 1.5 * p.map(gradientMagnitude, 0, zScale / 2, minStrokeWeight, maxStrokeWeight, true);

          // Draw contour line if `z` is close to a contour interval
          if (Math.abs(zInterpolated % contourInterval) < 1.2) {
            p.stroke(colors[0]);
            p.strokeWeight(strokeWeight);
            p.point(x, y);
          }
        }
      }
    };
  };

  return <div ref={canvasRef}></div>;
};

export default P5Canvas;
