// PixelArt.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { divideIntoBlocks } from '../utils/shapes/divideCanvas';
import { getBlockAverageColor } from '../utils/colors/getBlockAverageColor';
import { calculateBrightness } from '../utils/colors/calculateHSV';
import { getColorPalette } from '../assets/color';
import { pixelPatternSelector } from '../utils/shapes/pixelPatternSelector';

const P5Canvas = () => {
  const imagePath = '/man.jpg'; // Path of the image
  const canvasWidth = 1024;
  const canvasHeight = 768;
  const blockSize = 32;
  const patternSize = 4;
  const pixelSize = blockSize / patternSize;
  const colors = getColorPalette('default', 'gradient');
  const samplingInterval = 4;
  
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
      p.noStroke();
    };

    p.draw = () => {
      const pixels = divideIntoBlocks(p.width, p.height, pixelSize, pixelSize);

      pixels.forEach(pixel => {
        const avgColor = getBlockAverageColor(img, pixel, samplingInterval);
        const brightness = calculateBrightness(avgColor);

        // Select pattern and colors based on brightness
        const pixelColor = pixelPatternSelector(brightness, colors, (pixel.x / pixelSize) % patternSize, (pixel.y / pixelSize) % patternSize);

        p.fill(pixelColor);
        p.rect(
            pixel.x,
            pixel.y,
            pixelSize,
            pixelSize
        );

      });
    };
  };

  return <>
    <h1>
      Pixel Art
    </h1>
    <div ref={canvasRef}></div>
  </>;
};

export default P5Canvas;
