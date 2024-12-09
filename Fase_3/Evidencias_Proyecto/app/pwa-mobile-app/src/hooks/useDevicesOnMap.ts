import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { devicesOnFloorService } from "@/services/devicesOnFloor";
import Mappedin, { useMap } from "@mappedin/react-sdk";
import { getDeviceStatusColor } from "@/lib/generalUtils";
import { deviceService } from "@/services/deviceService";

interface UseDevicesOnMapProps {
  currentFloorId: string | null;
}

interface MappedinDeviceData {
  [mappedinId: string]: {
    name: string;
    location: string | undefined;
    status: string;
  };
}

let mappedinDeviceData: MappedinDeviceData = {};

const updateDevicesOnMap = async (
  floorId: string,
  mapView: Mappedin.MapView,
  mapData: Mappedin.MapData,
) => {
  const { devicesOnFloor } = await devicesOnFloorService(floorId);
  mapView.Labels.removeAll();

  // DEBUG space ids
//   mapData.getByType("space").forEach((space) => {
//   	console.table([space.name, space.id]);
//   });

  devicesOnFloor.forEach((device) => {
    const target = mapData.getById("space", device.rooms.mappedin_space_id);
    if (target) {
      mapView.Labels.add(target, device.name, {
        interactive: true,
        appearance: {
          marker: {
            foregroundColor: {
              active: getDeviceStatusColor(device.status, "normal"),
              inactive: getDeviceStatusColor(device.status, "normal"),
            },
          },
          text: {
            foregroundColor: getDeviceStatusColor(device.status, "normal"),
          },
        },
      });
    }
  });

  return mappedinDeviceData;
};

export function useDevicesOnMap({ currentFloorId }: UseDevicesOnMapProps) {
  const { mapView, mapData } = useMap();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState<any>(null);
  //Handle the click event on labels(devices)
  const handleClick = async (e: any) => {
    if (e.labels.length > 0) {
      let deviceSelectedName = e.labels[0].text;
      const deviceDetails =
        await deviceService.getDeviceDetails(deviceSelectedName);
      setDeviceDetails(deviceDetails);
      setIsDialogOpen(true);
    }
  };

  //Update the devices on the map when the currentFloorId changes
  useEffect(() => {
    if (currentFloorId && mapView) {
      updateDevicesOnMap(currentFloorId, mapView, mapData);
      mapView.on("click", handleClick);

      return () => {
        mapView.off("click", handleClick);
      };
    }
  }, [currentFloorId, mapView]);

  //Handle real-time updates from Supabase
  useEffect(() => {
    if (currentFloorId && mapView) {
      const subscription = supabase
        .channel("devices")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "devices" },
          () => {
            updateDevicesOnMap(currentFloorId, mapView, mapData);
          },
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [currentFloorId, mapView]);

  return {
    isDialogOpen,
    setIsDialogOpen,
    deviceDetails,
  };
}
