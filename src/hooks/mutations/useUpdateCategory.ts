import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "@/app/actions";
import { Category } from "@/lib/types/category";

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
