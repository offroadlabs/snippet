"use client";

import * as React from "react";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCodeGeneratorStore } from "@/store/code-generator-store";
import { nanoid } from "nanoid";

export function ImageUpload() {
  const { addImage } = useCodeGeneratorStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier que c'est bien une image PNG ou WebP
    if (!file.type.match(/^image\/(png|webp)$/)) {
      alert("Seuls les fichiers PNG et WebP sont acceptés");
      return;
    }

    // Créer une URL pour l'image
    const url = URL.createObjectURL(file);

    // Obtenir les dimensions de l'image
    const img = new Image();
    img.src = url;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Ajouter l'image au store
    addImage({
      id: nanoid(),
      url,
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
      rotation: 0,
      scale: 1,
      opacity: 1,
      brightness: 1,
      contrast: 1,
      saturation: 1,
      exposure: 1,
      hue: 0,
    });

    // Réinitialiser l'input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 
          border-border hover:border-border/80 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
        aria-label="Upload image"
      >
        <ImageIcon className="w-4 h-4 text-primary" />
      </Button>
    </>
  );
}
