import { useQueryClient, useMutation } from "react-query";
import { Category } from "../types/Category";
import { registCategory } from "../firebase/registerFirestore";

export const useMutateCategories = () => {
  const queryClient = useQueryClient();
  const createWorkloadMutation = useMutation(
    async (category: Category) => await registCategory(category),
    {
      onSuccess: (data: Category) => {
        const previousCategories =
          queryClient.getQueryData<Category[]>("categories");
        if (previousCategories) {
          queryClient.setQueryData<Category[]>("categories", [
            ...previousCategories,
            data,
          ]);
        }
        queryClient.invalidateQueries("categories");
      },
    }
  );
  return { createWorkloadMutation };
};
