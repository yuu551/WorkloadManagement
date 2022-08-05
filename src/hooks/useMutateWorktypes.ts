import { useQueryClient, useMutation } from "react-query";
import { WorkType } from "../types/Worktype";
import { registWorktype } from "../firebase/registerFirestore";

export const useMutateWorkTypes = () => {
  const queryClient = useQueryClient();
  const createWorkTypeMutation = useMutation(
    async (worktype: WorkType) => await registWorktype(worktype),
    {
      onSuccess: (data: WorkType) => {
        const previousCategories =
          queryClient.getQueryData<WorkType[]>("worktypes");
        if (previousCategories) {
          queryClient.setQueryData<WorkType[]>("worktypes", [
            ...previousCategories,
            data,
          ]);
        }
        queryClient.invalidateQueries("worktypes");
      },
    }
  );
  return { createWorkTypeMutation };
};
