import { useQuery } from "react-query";
import { Workload } from "../types/Workload";
import { getWorkloads } from "../firebase/getFirestore";

export const useQueryWorkloads = (mailAddress:  string | undefined | null) => {
  const getWorkloadsQuery = async () => {
    if(!mailAddress) {
        const arr:Array<Workload> = []
        return arr;
    }
    const snapshot = await getWorkloads(mailAddress);
    return snapshot.docs.map((doc) => {
      return doc.data() as Workload;
    });
  };

  return useQuery<Workload[], Error>({
    queryKey: "workloads",
    queryFn: getWorkloadsQuery,
    staleTime: Infinity,
  });
};
