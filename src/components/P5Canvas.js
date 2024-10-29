// P5Canvas.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { divideIntoBlocks } from '../utils/shapes/divideCanvas';
import { getBlockAverageColor } from '../utils/colors/getBlockAverageColor';
import { selectSymbol } from '../utils/shapes/symbolSelector';
import { calculateHue, calculateSaturation, calculateBrightness, calculateHSV } from '../utils/colors/calculateHSV';
import { getColorPalette } from '../assets/color';

const P5Canvas = () => {
  const imagePath = '/man.jpg'; // Path of the image
  const canvasWidth = 1024;
  const canvasHeight = 768;
  const fontSize = 15;
  const aspectRatio = 0.6; // Courier font aspect ratio
  const colors = getColorPalette('hacker');
  const samplingInterval = 4;
  
  const canvasRef = useRef();

  useEffect(() => {
    const p5Instance = new p5(sketch, canvasRef.current);
    return () => p5Instance.remove(); // Cleanup on component unmount
  }, []);

  const sketch = (p) => {
    let img;

    p.preload = () => {
      img = p.loadImage(imagePath);
    };

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
      p.background(colors.background);
    };

    p.draw = () => {
      const blocks = divideIntoBlocks(p.width, p.height, fontSize, aspectRatio);
      
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
        p.fill(colors.main);
        p.text(symbol, block.x + block.width / 2, block.y + block.height / 2);
      });
    };
  };

  return <>
    <h1>
      Symbol Palette
    </h1>
    <div ref={canvasRef}></div>
  </>;
};

export default P5Canvas;
