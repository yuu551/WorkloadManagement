import { useQueryClient, useMutation } from "react-query";
import { Workload } from "../types/Workload";
import { registWorkload } from "../firebase/registerFirestore";

export const useMutateWorkloads = () => {
  const queryClient = useQueryClient();
  const createWorkloadMutation = useMutation(
    async (workload: Workload) => await registWorkload(workload),
    {
      onSuccess: (data: Workload) => {
        const previousWorkloads =
          queryClient.getQueryData<Workload[]>("workloads");
        if (previousWorkloads) {
          queryClient.setQueryData<Workload[]>("workloads", [
            ...previousWorkloads,
            data,
          ]);
        }
        queryClient.invalidateQueries("workloads");
      },
    }
  );
  return { createWorkloadMutation };
};
