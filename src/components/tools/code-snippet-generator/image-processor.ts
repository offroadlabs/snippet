import type { UploadedImage } from "./types";

interface ImageFilters {
  brightness: number;
  contrast: number;
  saturation: number;
  exposure: number;
  hue: number;
}

export class ImageProcessor {
  private static async loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  private static hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  private static async applyFilters(
    imageElement: HTMLImageElement,
    filters: ImageFilters
  ): Promise<string> {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    // Dessiner l'image
    ctx.drawImage(imageElement, 0, 0);

    // Appliquer les filtres
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Convertir RGB en HSL
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      // Appliquer les ajustements
      h = (h + filters.hue / 360) % 1;
      s = Math.min(1, Math.max(0, s * filters.saturation));
      let newL = l;
      newL = Math.min(1, Math.max(0, l * filters.brightness));
      newL = Math.min(1, Math.max(0, newL * filters.exposure));

      // Convertir HSL en RGB
      let r1, g1, b1;
      if (s === 0) {
        r1 = g1 = b1 = newL;
      } else {
        const q = newL < 0.5 ? newL * (1 + s) : newL + s - newL * s;
        const p = 2 * newL - q;
        r1 = this.hue2rgb(p, q, h + 1/3);
        g1 = this.hue2rgb(p, q, h);
        b1 = this.hue2rgb(p, q, h - 1/3);
      }

      // Appliquer le contraste
      const factor = (259 * (filters.contrast + 255)) / (255 * (259 - filters.contrast));
      const contrast = (color: number) => {
        return Math.min(1, Math.max(0, factor * (color - 0.5) + 0.5));
      };

      r1 = contrast(r1);
      g1 = contrast(g1);
      b1 = contrast(b1);

      // Mettre à jour les pixels
      data[i] = r1 * 255;
      data[i + 1] = g1 * 255;
      data[i + 2] = b1 * 255;
      data[i + 3] = data[i + 3];
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  }

  public static async processImage(image: UploadedImage): Promise<string> {
    try {
      const loadedImage = await this.loadImage(image.url);
      const processedImageUrl = await this.applyFilters(loadedImage, {
        brightness: image.brightness,
        contrast: image.contrast,
        saturation: image.saturation,
        exposure: image.exposure,
        hue: image.hue,
      });

      return processedImageUrl;
    } catch (error) {
      console.error("Erreur lors du traitement de l'image:", error);
      return image.url;
    }
  }
} 