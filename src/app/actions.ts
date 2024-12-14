"use server";

import { Category } from "@/lib/types/category";
import { IImage } from "@/lib/types/image";
import { fetchApi } from "@/lib/utils/fetchApi";

export async function getCategories() {
  try {
    return await fetchApi<Category[]>("/categories");
  } catch {
    throw new Error("Failed to fetch categories");
  }
}

export async function getCategoryById(id: number) {
  try {
    return await fetchApi<Category>(`/categories/${id}`);
  } catch {
    throw new Error(`Failed to fetch category with id ${id}`);
  }
}

export async function getImages() {
  try {
    return await fetchApi<IImage[]>("/images");
  } catch {
    throw new Error("Failed to fetch images");
  }
}

export async function getImageById(id: number) {
  try {
    return await fetchApi<IImage>(`/images/${id}`);
  } catch {
    throw new Error(`Failed to fetch image with id ${id}`);
  }
}
