export const loadAndProcessImage = (p, imagePath, targetWidth = 1024, targetHeight = 768) => {
    return new Promise((resolve) => {
      p.loadImage(imagePath, loadedImg => {
        const scale = Math.max(targetWidth / loadedImg.width, targetHeight / loadedImg.height);
        const tempCanvas = p.createGraphics(loadedImg.width * scale, loadedImg.height * scale);
        tempCanvas.image(loadedImg, 0, 0, loadedImg.width * scale, loadedImg.height * scale);
        const x = (tempCanvas.width - targetWidth) / 2;
        const y = (tempCanvas.height - targetHeight) / 2;
        const processedImg = tempCanvas.get(x, y, targetWidth, targetHeight);
        tempCanvas.remove();
        resolve(processedImg);
      });
    });
  };