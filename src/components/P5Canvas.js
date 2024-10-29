// SymbolPalette.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Canvas = () => {
  const imagePath = '/man.jpg'; // Path of the image
  const canvasWidth = 1024;
  const canvasHeight = 768;
  
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
    };

    p.draw = () => {
      
    };
  };

  return <>
    <h1>
      
    </h1>
    <div ref={canvasRef}></div>
  </>;
};

export default P5Canvas;
