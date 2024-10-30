import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Canvas = ({ 
  imagePath,
  canvasWidth,
  canvasHeight,
  threshold,
  samplingInterval,
  colors
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
      p.noFill();
      p.background(colorBackground);
    };

    const calculateGradient = (x, y) => {
      const getPixelBrightness = (px, py) => {
        if (px < 0 || px >= img.width || py < 0 || py >= img.height) {
          return 0;
        }
        const d = img.get(px, py);
        return (d[0] + d[1] + d[2]) / 3;
      };

      const topLeft = getPixelBrightness(x - samplingInterval, y - samplingInterval);
      const top = getPixelBrightness(x, y - samplingInterval);
      const topRight = getPixelBrightness(x + samplingInterval, y - samplingInterval);
      const left = getPixelBrightness(x - samplingInterval, y);
      const right = getPixelBrightness(x + samplingInterval, y);
      const bottomLeft = getPixelBrightness(x - samplingInterval, y + samplingInterval);
      const bottom = getPixelBrightness(x, y + samplingInterval);
      const bottomRight = getPixelBrightness(x + samplingInterval, y + samplingInterval);

      const dx = (topRight + 2 * right + bottomRight) - (topLeft + 2 * left + bottomLeft);
      const dy = (bottomLeft + 2 * bottom + bottomRight) - (topLeft + 2 * top + topRight);

      return Math.sqrt(dx * dx + dy * dy);
    };

    p.draw = () => {
      img.resize(canvasWidth, canvasHeight);
      p.push();
      p.strokeWeight(samplingInterval);
      p.stroke(colorStroke);

      for (let x = 1; x < canvasWidth - 1; x += samplingInterval) {
        for (let y = 1; y < canvasHeight - 1; y += samplingInterval) {
          const gradient = calculateGradient(x, y);
          if (gradient > threshold) {
            p.point(x, y);
          }
        }
      }
      p.pop();
    };
  };

  return <div ref={canvasRef} className="canvas-component-inner"></div>;
};

export default P5Canvas; 