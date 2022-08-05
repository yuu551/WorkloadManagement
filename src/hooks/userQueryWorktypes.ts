import { useQuery } from "react-query";
import { WorkType } from "../types/Worktype";
import { getWorkTypes } from "../firebase/getFirestore";

export const useQueryWorktypes = (mailAddress: string | undefined | null) => {
  const getWorktypesQuery = async () => {
    if (!mailAddress) {
      const arr: Array<WorkType> = [];
      return arr;
    }
    const snapshot = await getWorkTypes(mailAddress);
    return snapshot.docs.map((doc) => {
      return doc.data() as WorkType;
    });
  };

  return useQuery<WorkType[], Error>({
    queryKey: "worktypes",
    queryFn: getWorktypesQuery,
    staleTime: Infinity,
  });
};
