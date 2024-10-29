// Isoline.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Canvas = ({ 
  imagePath,
  canvasWidth,
  canvasHeight,
  colors,
  isolineDensity
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
      p.noFill();
    };

    p.draw = () => {
      img.loadPixels();

      // Loop to draw isolines across the entire canvas
      for (let y = 0; y < p.height; y += 5) {
        p.beginShape();

        for (let x = 0; x < p.width; x += 5) {
          const idx = (y * img.width + x) * 4;
          const r = img.pixels[idx];
          const g = img.pixels[idx + 1];
          const b = img.pixels[idx + 2];

          const brightness = (r + g + b) / 3 / 255;
          const densityFactor = p.map(brightness, 0, 1, isolineDensity, 0.5);

          // Calculate noise-based position adjustment for the isoline
          const xOffset = x * 0.01 * densityFactor;
          const yOffset = y * 0.01 * densityFactor;
          const noiseVal = p.noise(xOffset, yOffset) * p.TWO_PI;

          // Adjust position based on Perlin noise
          const nx = x + p.cos(noiseVal) * densityFactor * 5;
          const ny = y + p.sin(noiseVal) * densityFactor * 5;

          p.stroke(colors[0]);
          p.strokeWeight(1);
          p.vertex(nx, ny); // Create continuous line across the canvas
        }

        p.endShape();
      }
    };
  };

  return <div ref={canvasRef}></div>;
};

export default P5Canvas;
