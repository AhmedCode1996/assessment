import { revalidatePath } from "next/cache";
import { Category } from "../types/category";
import { fetchApi } from "../utils/fetchApi";
import { IImage } from "../types/image";

export async function createCategory(category: Omit<Category, "id" | "image">) {
  try {
    const response = await fetchApi<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(category),
    });
    revalidatePath("/categories");
    return response;
  } catch {
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
  } catch {
    throw new Error(`Failed to update category with id ${id}`);
  }
}

export async function deleteCategory(id: number) {
  try {
    await fetchApi(`/categories/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/categories");
  } catch {
    throw new Error(`Failed to delete category with id ${id}`);
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
  } catch {
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
  } catch {
    throw new Error(`Failed to update image with id ${id}`);
  }
}

export async function deleteImage(id: number) {
  try {
    await fetchApi(`/images/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/images");
  } catch {
    throw new Error(`Failed to delete image with id ${id}`);
  }
}
