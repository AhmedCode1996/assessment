import { getImages } from "@/app/actions";
import { IImage } from "@/lib/types/image";
import { QueryOptions, useQuery } from "@tanstack/react-query";

interface UseImages extends QueryOptions<IImage[]> {
  params?: Record<string, string | null>;
}
export function useImages({ params, ...queryProps }: UseImages) {
  const query = useQuery({
    queryKey: ["images", params],
    queryFn: getImages,
    ...queryProps,
  });

  return query;
}
