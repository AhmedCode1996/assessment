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

interface ContentProps {
  initialImages: IImage[];
}
const Content = ({ initialImages }: ContentProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  // Params should be passed, but the backend doesn't support it yet.
  const { data: imagesData = [], isLoading } = useImages({
    initialData: initialImages,
  });
  const { categories } = useCategories();

  const deleteImageMutation = useDeleteImage();

  const handleDeleteImage = () => {
    if (selectedImage) {
      deleteImageMutation.mutate(selectedImage, {
        onSuccess: () => {
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
      <Typography variant="h4" component="h1" gutterBottom>
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
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
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
            images={filteredImages}
            isLoading={isLoading}
            onDeleteImage={(imageId) => {
              setSelectedImage(imageId);
              setOpenDeleteDialog(true);
            }}
          />
        </>
      )}

      {activeTab === 1 && <Categories />}

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteImage}
      />

      <ImageUploadModal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
      />
    </Container>
  );
};

export default Content;
