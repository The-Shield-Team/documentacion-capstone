import { useEffect, useState } from "react";
import { useMap } from "@mappedin/react-sdk";

interface UseFloorOnMapProps {
  floorId: string | null;
}

export function useFloorOnMap({ floorId }: UseFloorOnMapProps) {
  const { mapView } = useMap();
  const [currentFloorId, setCurrentFloorId] = useState<string | null>(null);

  useEffect(() => {
    if (floorId && mapView) {
      mapView.setFloor(floorId);
      setCurrentFloorId(floorId);
    }
  }, [floorId, mapView]);

  return { currentFloorId };
}
