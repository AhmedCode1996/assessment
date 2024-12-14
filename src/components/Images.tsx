"use client";

import { Box, Paper } from "@mui/material";
import { ImageCard } from "./ImageCard";
import { IImage } from "@/lib/types/image";
import { Category } from "@/lib/types/category";

interface ImagesProps {
  images: IImage[];
  onDeleteImage: (imageId: number) => void;
  initialCategories: Category[];
}

function Images({ images, onDeleteImage, initialCategories }: ImagesProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: 2,
        }}
      >
        {images.map((image) => (
          <ImageCard
            initialCategories={initialCategories}
            key={image.id}
            image={image}
            onDelete={() => onDeleteImage(image.id)}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default Images;
