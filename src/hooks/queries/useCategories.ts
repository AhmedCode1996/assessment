import { getCategories } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const {
    data: categories = [],
    isPending: isCategoriesPending,
    isLoading: isCategoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { categories, isCategoriesLoading, isCategoriesPending };
}
