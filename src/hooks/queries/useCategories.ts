import { getCategories } from "@/app/actions";
import { Category } from "@/lib/types/category";
import { useQuery, QueryOptions } from "@tanstack/react-query";

interface UseCategories extends QueryOptions<Category[]> {
  params?: Record<string, string | null>;
}

export function useCategories({ params, ...queryProps }: UseCategories) {
  const query = useQuery({
    queryKey: ["categories", params],
    queryFn: getCategories,
    ...queryProps,
  });

  return query;
}
