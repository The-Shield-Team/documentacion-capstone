import { deviceUsage } from "@/services/deviceUsage";
import { useState } from "react";

export const useDevice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const startUsingDevice = async (deviceId: number, userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deviceUsage.start(deviceId, userId);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Error al iniciar uso del dispositivo");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const stopUsingDevice = async (deviceId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deviceUsage.stop(deviceId);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Error al detener uso del dispositivo");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    startUsingDevice,
    stopUsingDevice,
    isLoading,
    error,
  };
};
