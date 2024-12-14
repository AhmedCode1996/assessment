"use client";

import { getCategories } from "@/app/actions";
import { useUploadImage } from "@/hooks/mutations";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

interface ImageUploadModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ImageUploadModal({
  open,
  onClose,
}: ImageUploadModalProps) {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [size, setSize] = useState("");
  const [resolution, setResolution] = useState("");

  const uploadImageMutation = useUploadImage();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleClose = () => {
    setName("");
    setSelectedCategory("");
    setFile(null);
    setPreviewUrl("");
    setSize("");
    setResolution("");
    onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileSizeInMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
      setSize(`${fileSizeInMB} MB`);

      const img = new window.Image();
      const objectUrl = URL.createObjectURL(selectedFile);

      img.onload = () => {
        setResolution(`${img.width}x${img.height}`);
        URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedCategory || !file || !size || !resolution)
      return;

    uploadImageMutation.mutate(
      {
        name,
        url: previewUrl,
        categoryId: parseInt(selectedCategory),
        uploadDate: new Date().toISOString(),
        metadata: {
          size,
          resolution,
        },
      },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error("Upload failed:", error);
        },
      },
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Upload New Image</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="image-name"
              label="Image Name"
              name="imageName"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={name.trim() === ""}
              helperText={name.trim() === "" ? "Image name is required" : ""}
            />

            <TextField
              id="image-category"
              label="Category"
              name="imageCategory"
              select
              fullWidth
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              error={!selectedCategory}
              helperText={!selectedCategory ? "Category is required" : ""}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              id="image-upload-button"
              variant="outlined"
              component="label"
              fullWidth
            >
              Select Image
              <input
                type="file"
                name="imageFile"
                hidden
                accept="image/*"
                onChange={handleFileSelect}
              />
            </Button>

            {file && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Size: {size}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Resolution: {resolution}
                </Typography>
              </Box>
            )}

            {previewUrl && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  Preview:
                </Typography>
                <Box position="relative" width="100%" height="200px">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              !name.trim() ||
              !selectedCategory ||
              !file ||
              !size ||
              !resolution ||
              uploadImageMutation.isPending
            }
          >
            {uploadImageMutation.isPending ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
