import { useState, useEffect } from "react";
import { Device, deviceService } from "@/services/deviceService";
import { useAuth } from "@/context/AuthProvider";
import { fetchUserProfile } from "@/services/userProfileService";
import { buildingFloorsService } from "@/services/buildingFloorsService";

interface Floor {
  id: number;
  name: string;
}

export function useDeviceSearch() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [selectedFloorId, setSelectedFloorId] = useState<number | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user } = useAuth();

  // Efecto para cargar los pisos
  useEffect(() => {
    const fetchFloors = async () => {
      if (!user) return;

      try {
        const userProfile = await fetchUserProfile(user.id);
        const buildingFloors = await buildingFloorsService(
          userProfile.buildingId.toString(),
        );

        if (buildingFloors?.floors?.length) {
          const formattedFloors = buildingFloors.floors.map((floor) => ({
            id: floor.id,
            name: floor.name,
          }));
          setFloors(formattedFloors);
        }
      } catch (error) {
        console.error("Error fetching floors:", error);
      }
    };

    fetchFloors();
  }, [user]);

  // Efecto para cargar los dispositivos
  useEffect(() => {
    const fetchDevices = async () => {
      if (!user?.id) {
        setError(new Error("User ID is required"));
        setIsLoading(false);
        return;
      }

      try {
        const data = await deviceService.getAllBuildingDevices(user.id);
        setDevices(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Error fetching devices"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, [user]);

  // Filtrar dispositivos basado en búsqueda y piso seleccionado
  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFloor =
      !selectedFloorId || device.rooms?.floors?.id === selectedFloorId;

    return matchesSearch && matchesFloor;
  });

  return {
    devices: filteredDevices,
    floors,
    selectedFloorId,
    selectedDevice,
    searchQuery,
    isLoading,
    error,
    isDialogOpen,
    setSearchQuery,
    setSelectedFloorId,
    setSelectedDevice,
    setIsDialogOpen,
  };
}
