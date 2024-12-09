import { useEffect } from "react";
import { useMap } from "@mappedin/react-sdk";
import { TCameraFocusOnTarget } from "@mappedin/react-sdk/mappedin-js/src/types";

interface UseCameraFocusOnDeviceProps {
  spaceId: string | null;
  floorId: string | null;
}

export function useCameraFocusOnDevice({
  spaceId,
  floorId,
}: UseCameraFocusOnDeviceProps) {
  const { mapView, mapData } = useMap();

  useEffect(() => {
    if (!spaceId || !floorId) return;

    mapView.Camera.focusOn(
      mapData.getById("space", spaceId) as TCameraFocusOnTarget,
      {
        duration: 1000,
        easing: "easeInOut",
      },
    );
  }, [spaceId, floorId]);
}
