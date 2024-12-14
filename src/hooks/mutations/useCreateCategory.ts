import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/app/actions";
import { Category } from "@/lib/types/category";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Category, "id" | "image">) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
