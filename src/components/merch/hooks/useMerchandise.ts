import { useState, useEffect } from "react";
import { Merchandise, ApiResponse } from "../../../types/shop";
import { shopApi } from "../services/api";

export function useMerchandise() {
  const [merchandise, setMerchandise] = useState<Merchandise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMerchandise();
  }, []);

  const fetchMerchandise = async () => {
    try {
      setLoading(true);
      const response = await shopApi.getMerchandise();
      setMerchandise(response.data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch merchandise"
      );
    } finally {
      setLoading(false);
    }
  };

  return { merchandise, loading, error, refetch: fetchMerchandise };
}
