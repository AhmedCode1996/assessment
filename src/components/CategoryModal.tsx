"use client";

import { useCreateCategory, useUpdateCategory } from "@/hooks/mutations";
import { Category } from "@/lib/types/category";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  category?: Category;
  isEdit?: boolean;
}

export default function CategoryModal({
  open,
  onClose,
  category,
  isEdit = false,
}: CategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [category, open]);

  const handleClose = () => {
    setName("");
    setDescription("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const categoryData = {
      name,
      description,
    };

    if (isEdit && category) {
      updateCategoryMutation.mutate(
        {
          id: category.id,
          data: categoryData,
        },
        {
          onSuccess: () => {
            handleClose();
          },
        },
      );
    } else {
      createCategoryMutation.mutate(categoryData, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  const isPending =
    createCategoryMutation.isPending ||
    updateCategoryMutation.isPending ||
    !name.trim() ||
    !description.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEdit ? "Edit Category" : "Create New Category"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              autoFocus
              label="Category Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={name.trim() === ""}
              helperText={name.trim() === "" ? "Category name is required" : ""}
            />

            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={3}
              error={description.trim() === ""}
              helperText={
                description.trim() === "" ? "Description is required" : ""
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
