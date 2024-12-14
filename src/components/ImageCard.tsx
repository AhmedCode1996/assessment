"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IImage } from "@/lib/types/image";
import Image from "next/image";
import { useCategories } from "@/hooks/queries/useCategories";
import { Category } from "@/lib/types/category";

interface ImageCardProps {
  image: IImage;
  onDelete: () => void;
  initialCategories: Category[];
}

export function ImageCard({
  image,
  onDelete,
  initialCategories,
}: ImageCardProps) {
  const { data: categories } = useCategories({
    initialData: initialCategories,
  });
  const category = categories?.find((cat) => cat.id === image.categoryId);
  const categoryName = category?.name || "Unknown Category";

  return (
    <Card>
      <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
        <Image
          fill
          src={image.url}
          alt={image.name}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {image.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {categoryName}
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
