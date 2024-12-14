import { uploadImage } from "@/lib/services/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}
