import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/app/actions";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
