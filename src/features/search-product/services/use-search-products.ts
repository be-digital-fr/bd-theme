// import { useQuery } from "@tanstack/react-query";
// import { searchProducts } from "./search-products";

export function useSearchProducts(query: string) {
  //   return useQuery({
  //     queryKey: ["products", "search", query],
  //     queryFn: () => searchProducts(query),
  //     enabled: query.length > 0,
  //     staleTime: 1000 * 60 * 5, // 5 minutes
  //   });
  return {
    data: [],
    isLoading: false,
    error: null,
  };
}
