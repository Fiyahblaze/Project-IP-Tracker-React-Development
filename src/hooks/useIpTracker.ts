import { useCallback, useEffect, useState } from "react";
import { fetchIpData } from "../services/ipifyApi";
import type { IpData } from "../types/ip";

interface UseIpTrackerResult {
  ipData: IpData | null;
  isLoading: boolean;
  error: string | null;
  searchIp: (searchTerm: string) => Promise<void>;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Something went wrong while loading the IP information.";
}

export function useIpTracker(): UseIpTrackerResult {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialData(): Promise<void> {
      try {
        const data = await fetchIpData("", controller.signal);

        if (!controller.signal.aborted) {
          setIpData(data);
        }
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setError(getErrorMessage(requestError));
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialData();

    return () => {
      controller.abort();
    };
  }, []);

  const searchIp = useCallback(
    async (searchTerm: string): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchIpData(searchTerm);
        setIpData(data);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    ipData,
    isLoading,
    error,
    searchIp,
  };
}