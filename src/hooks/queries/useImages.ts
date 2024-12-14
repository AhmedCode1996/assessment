import { getImages } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export function useImages() {
  const {
    data: images = [],
    isPending: isImagesPending,
    isLoading: isImagesLoading,
  } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  return { images, isImagesLoading, isImagesPending };
}
