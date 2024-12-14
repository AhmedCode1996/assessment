"use client";

import { Box, Paper } from "@mui/material";
import { ImageCard } from "./ImageCard";
import { IImage } from "@/lib/types/image";

interface ImagesProps {
  images: IImage[];
  isLoading: boolean;
  onDeleteImage: (imageId: number) => void;
}

function Images({ images, isLoading, onDeleteImage }: ImagesProps) {
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
            key={image.id}
            image={image}
            onDelete={() => onDeleteImage(image.id)}
            isLoading={isLoading}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default Images;
