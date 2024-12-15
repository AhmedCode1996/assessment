"use client";
import { Category } from "@/lib/types/category";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Paper, Typography } from "@mui/material";

interface CategoryItemProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryItem({
  category,
  onEdit,
  onDelete,
}: CategoryItemProps) {
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
