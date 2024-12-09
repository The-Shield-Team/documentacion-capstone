import { MapView, useMapData } from "@mappedin/react-sdk";
import { ReactNode, useState } from "react";
import { Spinner } from "../atoms/Spinner";
import { useDevicesOnMap } from "@/hooks/useDevicesOnMap";
import { useFloorOnMap } from "@/hooks/useFloorOnMap";
import { DeviceDialog } from "./DeviceDialogHome";
import { useCameraFocusOnDevice } from "@/hooks/useCameraFocusOnDevice";

interface MapComponentProps {
  mappedinMapId: string;
  onMapReady: (isReady: boolean) => ReactNode;
  selectedFloorId: string | null;
  specialAction: { action: string; spaceId: string; floorId: string } | null;
  mappedinKey: string;
  mappedinSecret: string;
}

export function MapComponent({
  mappedinMapId,
  onMapReady,
  selectedFloorId,
  specialAction,
  mappedinKey,
  mappedinSecret,
}: MapComponentProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const { isLoading, error, mapData } = useMapData({
    key: mappedinKey,
    secret: mappedinSecret,
    mapId: mappedinMapId,
  });

  //DEBUG floor ids
  //console.log(mapData?.getByType("floor"));

  if (isLoading || !mapData) {
    return (
      <div className="h-[80vh]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 p-6">
        <div className="text-destructive text-center">
          <h2 className="text-lg font-semibold">Error</h2>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 p-4">
        <MapView
          mapData={mapData}
          style={{ width: "100%", height: "calc(100vh - 500px)" }}
          onLoad={() => setIsMapReady(true)}
        >
          <MapContent
            selectedFloorId={selectedFloorId}
            specialAction={specialAction}
          />
        </MapView>
      </div>
      {onMapReady(isMapReady)}
    </>
  );
}

function MapContent({
  selectedFloorId,
  specialAction,
}: {
  selectedFloorId: string | null;
  specialAction: { action: string; spaceId: string; floorId: string } | null;
}) {
  const { currentFloorId } = useFloorOnMap({ floorId: selectedFloorId });
  const { deviceDetails, isDialogOpen, setIsDialogOpen } = useDevicesOnMap({
    currentFloorId,
  });

  switch (specialAction?.action) {
    case "locate":
      useCameraFocusOnDevice({
        spaceId: specialAction.spaceId,
        floorId: specialAction.floorId,
      });
      break;
    case "nearestRoute":
      console.log("Nearest route action");
      break;
  }

  return (
    <>
      {deviceDetails && (
        <DeviceDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          deviceData={deviceDetails}
        />
      )}
      {/* <DoorLabels  */}
    </>
  );
}
