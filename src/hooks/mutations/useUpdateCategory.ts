import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/lib/types/category";
import { updateCategory } from "@/lib/services/services";

interface UpdateCategoryVariables {
  id: number;
  data: Partial<Category>;
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryVariables) =>
      updateCategory(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories", id] });
    },
  });
}
