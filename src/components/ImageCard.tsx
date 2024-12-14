"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IImage } from "@/lib/types/image";
import { LoadingSkeleton } from "./LoadingSkeleton";
import Image from "next/image";

interface ImageCardProps {
  image: IImage;
  onDelete: () => void;
  isLoading: boolean;
}

export function ImageCard({ image, onDelete, isLoading }: ImageCardProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Card>
      <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
        <Image fill src={image.url} alt={image.name} objectFit="cover" />
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {image.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {image.categoryId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            size="small"
            fullWidth
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}