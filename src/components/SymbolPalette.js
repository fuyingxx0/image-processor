// SymbolPalette.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { divideIntoBlocks } from '../utils/shapes/divideCanvas';
import { getBlockAverageColor } from '../utils/colors/getBlockAverageColor';
import { selectSymbol } from '../utils/shapes/symbolSelector';
import { calculateHue, calculateSaturation, calculateBrightness, calculateHSV } from '../utils/colors/calculateHSV';
import { getColorPalette } from '../assets/color';

const P5Canvas = ({ 
  imagePath,
  canvasWidth,
  canvasHeight,
  fontSize,
  aspectRatio,
  colors,
  samplingInterval
}) => {
  const canvasRef = useRef();
  const colorBackground = colors[0] || colors.background;
  const colorText = colors[colors.length - 1] || colors.text;

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
      p.fill(colorText);
    };

    p.draw = () => {
      const blocks = divideIntoBlocks(p.width, p.height, Math.floor(fontSize * aspectRatio), fontSize);
      
      p.textFont('Courier');
      p.textSize(fontSize);
      p.textAlign(p.CENTER, p.CENTER);

      blocks.forEach(block => {
        // Calculate average color and brightness
        const avgColor = getBlockAverageColor(img, block, samplingInterval);
        const brightness = calculateBrightness(avgColor);
        // Select the symbol based on brightness
        const symbol = selectSymbol(brightness);
        // Draw the symbol on the canvas
        p.text(symbol, block.x + block.width / 2, block.y + block.height / 2);
      });
    };
  };

  return <div ref={canvasRef}></div>;
};

export default P5Canvas;
