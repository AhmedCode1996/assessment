"use client";
import { useDebounce } from "@/hooks/common/useDebounce";
import { Category } from "@/lib/types/category";
import { TextField, MenuItem, Box } from "@mui/material";
import { useEffect, useState } from "react";

interface SearchBarProps {
  searchQuery: string;
  selectedCategory: string;
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function SearchBar({
  searchQuery,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: SearchBarProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

  useEffect(() => {
    onSearchChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearchChange]);
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <TextField
        id="search-images"
        label="Search images"
        name="searchQuery"
        variant="outlined"
        size="small"
        value={localSearchQuery}
        onChange={(e) => setLocalSearchQuery(e.target.value)}
        sx={{ width: 300 }}
      />
      <TextField
        id="filter-category"
        label="Category"
        name="filterCategory"
        select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        size="small"
        sx={{ width: 200 }}
      >
        <MenuItem value="all">All Categories</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id.toString()}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
