import { deleteImage } from "@/lib/services/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}
