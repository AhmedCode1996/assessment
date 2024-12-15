"use client";

import { useDeleteCategory } from "@/hooks/mutations";
import { useCategories } from "@/hooks/queries/useCategories";
import { Category } from "@/lib/types/category";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper } from "@mui/material";
import { useState } from "react";
import { CategoryItem } from "./CategoryItem";
import CategoryModal from "./CategoryModal";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

interface CategoriesProps {
  categoriesData: Category[];
}

function Categories({ categoriesData }: CategoriesProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isEdit, setIsEdit] = useState(false);
  const deleteCategoryMutation = useDeleteCategory();

  const { data: categories } = useCategories({
    initialData: categoriesData,
  });

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsEdit(true);
    setOpenModal(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteCategoryMutation.mutate(selectedCategory.id, {
        onSuccess: () => {
          setOpenDeleteDialog(false);
          setSelectedCategory(null);
        },
        onError: () => {
          setOpenDeleteDialog(false);
          setSelectedCategory(null);
        },
        onSettled: () => {
          setOpenDeleteDialog(false);
          setSelectedCategory(null);
        },
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
    setIsEdit(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setIsEdit(false);
              setOpenModal(true);
            }}
          >
            Add New Category
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: 2,
          }}
        >
          {categories?.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onEdit={() => handleEdit(category)}
              onDelete={() => handleDelete(category)}
            />
          ))}
        </Box>

        <CategoryModal
          open={openModal}
          onClose={handleCloseModal}
          category={selectedCategory || undefined}
          isEdit={isEdit}
        />

        <DeleteConfirmationDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
          entityName="category"
        />
      </Box>
    </Paper>
  );
}

export default Categories;
