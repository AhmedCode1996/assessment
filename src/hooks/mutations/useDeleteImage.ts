import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "@/app/actions";

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}
