import { getInitialURL, useURL } from "expo-linking";
import { useState, useEffect } from "react";

export const useBetterURL = (): string | null | undefined => {
  const url = useURL();
  const [urlState, setUrlState] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    async function updateURL() {
      try {
        if (urlState === undefined) {
          const initialUrl = await getInitialURL();
          if (initialUrl !== urlState) {
            setUrlState(initialUrl);
          }
          return;
        }

        if (url !== urlState) {
          setUrlState(url);
        }
      } catch (error) {
        console.error("Failed to fetch initial URL:", error);
      }
    }

    void updateURL();
  }, [url, urlState]);

  return urlState;
};
