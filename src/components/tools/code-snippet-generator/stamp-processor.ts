import type { Stamp } from "./types";

export class StampProcessor {
  static async processStamp(stamp: Stamp): Promise<HTMLImageElement> {
    // Create canvas for drawing emoji
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Set canvas size
    canvas.width = 64;
    canvas.height = 64;

    // Configure text rendering
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Extract emoji from ReactNode
    let emojiText = '';
    if (stamp.icon && typeof stamp.icon === 'object' && 'props' in stamp.icon) {
      const props = stamp.icon.props as { children: string };
      emojiText = props.children;
    }

    // Draw emoji in center
    ctx.fillText(emojiText, canvas.width / 2, canvas.height / 2);

    // Apply filters using temporary canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) throw new Error('Could not get temp canvas context');

    tempCtx.filter = `brightness(${stamp.brightness}) contrast(${stamp.contrast}) saturate(${stamp.saturation}) hue-rotate(${stamp.hue}deg)`;
    tempCtx.drawImage(canvas, 0, 0);
    
    // Create and return filtered image
    const image = new Image();
    const dataUrl = tempCanvas.toDataURL('image/png');

    return new Promise((resolve, reject) => {
      image.onload = () => {
        image.style.width = '2rem';
        image.style.height = '2rem';
        image.style.objectFit = 'contain';
        image.style.display = 'block';
        resolve(image);
      };
      image.onerror = (error) => reject(error);
      image.src = dataUrl;
    });
  }
} 