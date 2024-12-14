"use client";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Category } from "@/lib/types/category";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface CategoryItemProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

export function CategoryItem({
  category,
  onEdit,
  onDelete,
  isLoading,
}: CategoryItemProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">{category.name}</Typography>
      <Box>
        <IconButton size="small" color="primary" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
