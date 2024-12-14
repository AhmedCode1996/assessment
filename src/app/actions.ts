/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { Category } from "@/lib/types/category";
import { IImage } from "@/lib/types/image";
import { fetchApi } from "@/lib/utils/fetchApi";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    return await fetchApi<Category[]>("/categories");
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
}

export async function getCategoryById(id: number) {
  try {
    return await fetchApi<Category>(`/categories/${id}`);
  } catch (error) {
    throw new Error(`Failed to fetch category with id ${id}`);
  }
}

export async function createCategory(category: Omit<Category, "id" | "image">) {
  try {
    const response = await fetchApi<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(category),
    });
    revalidatePath("/categories");
    return response;
  } catch (error) {
    throw new Error("Failed to create category");
  }
}

export async function updateCategory(id: number, category: Partial<Category>) {
  try {
    const response = await fetchApi<Category>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
    revalidatePath("/categories");
    revalidatePath(`/categories/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to update category with id ${id}`);
  }
}

export async function deleteCategory(id: number) {
  try {
    await fetchApi(`/categories/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/categories");
  } catch (error) {
    throw new Error(`Failed to delete category with id ${id}`);
  }
}

export async function getImages() {
  try {
    return await fetchApi<IImage[]>("/images");
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
}

export async function getImageById(id: number) {
  try {
    return await fetchApi<IImage>(`/images/${id}`);
  } catch (error) {
    throw new Error(`Failed to fetch image with id ${id}`);
  }
}

export async function uploadImage(image: Omit<IImage, "id">) {
  try {
    const response = await fetchApi<IImage>("/images", {
      method: "POST",
      body: JSON.stringify(image),
    });
    revalidatePath("/images");
    return response;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
}

export async function updateImage(id: number, image: Partial<IImage>) {
  try {
    const response = await fetchApi<IImage>(`/images/${id}`, {
      method: "PUT",
      body: JSON.stringify(image),
    });
    revalidatePath("/images");
    revalidatePath(`/images/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Failed to update image with id ${id}`);
  }
}

export async function deleteImage(id: number) {
  try {
    await fetchApi(`/images/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/images");
  } catch (error) {
    throw new Error(`Failed to delete image with id ${id}`);
  }
}
