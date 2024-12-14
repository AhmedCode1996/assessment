"use client";
import React, { useState } from "react";

import { useCategories } from "@/hooks/queries/useCategories";

import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import Categories from "./Categories";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import ImageUploadModal from "./ImageModal";
import Images from "./Images";
import { SearchBar } from "./SearchBar";

import { useDeleteImage } from "@/hooks/mutations";
import { IImage } from "@/lib/types/image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useImages } from "@/hooks/queries/useImages";
import { Category } from "@/lib/types/category";

interface ContentProps {
  initialData: {
    initialImages: IImage[];
    initialCategories: Category[];
  };
}
const Content = ({
  initialData: { initialCategories, initialImages },
}: ContentProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Params should be passed, but the backend doesn't support it yet.
  const { data: imagesData = [] } = useImages({
    initialData: initialImages,
  });
  const { data: categoriesData = [] } = useCategories({
    initialData: initialCategories,
  });

  const deleteImageMutation = useDeleteImage();

  const handleDeleteImage = () => {
    if (selectedImage) {
      deleteImageMutation.mutate(selectedImage, {
        onSuccess: () => {
          setOpenDeleteDialog(false);
          setSelectedImage(null);
        },
        onError: (error) => {
          console.error("Failed to delete image:", error);
          setOpenDeleteDialog(false);
          setSelectedImage(null);
        },
        onSettled: () => {
          setOpenDeleteDialog(false);
          setSelectedImage(null);
        },
      });
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // we are using client side filtering because backend doesn't support it yet.
  const filteredImages = imagesData.filter((image) => {
    const matchesSearch = image.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      image.categoryId === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Image Management System
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Gallery" />
          <Tab label="Categories" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categoriesData}
            />
            <Button
              variant="contained"
              startIcon={<AddPhotoAlternateIcon />}
              onClick={() => setOpenUploadModal(true)}
            >
              Upload Image
            </Button>
          </Box>

          <Images
            initialCategories={categoriesData}
            images={filteredImages}
            onDeleteImage={(imageId) => {
              setSelectedImage(imageId);
              setOpenDeleteDialog(true);
            }}
          />
        </>
      )}

      {activeTab === 1 && <Categories categoriesData={categoriesData} />}

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteImage}
        entityName="image"
      />

      <ImageUploadModal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
      />
    </Container>
  );
};

export default Content;
