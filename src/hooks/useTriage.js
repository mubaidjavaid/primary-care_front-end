import { useMutation, useQuery } from "@tanstack/react-query";
import { triageService } from "../services/triage.service";

export function useTriage() {
  const mutation = useMutation({
    mutationFn: triageService.runQuery,
  });

  return {
    runTriage: async (payload) => {
      const response = await mutation.mutateAsync(payload);
      return response.data;
    },
    isRunning: mutation.isPending,
  };
}

export function useTriageLogs(params) {
  return useQuery({
    queryKey: ["triage-logs", params],
    queryFn: async () => {
      const response = await triageService.getLogs(params);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
