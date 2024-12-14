import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/lib/types/category";
import { createCategory } from "@/lib/services/services";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Category, "id" | "image">) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
