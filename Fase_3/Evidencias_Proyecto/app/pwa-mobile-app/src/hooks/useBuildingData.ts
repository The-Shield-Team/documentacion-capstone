import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { fetchUserProfile } from "@/services/userProfileService";
import { buildingFloorsService } from "@/services/buildingFloorsService";
import { useSearchParams } from "react-router-dom";

interface BuildingData {
  mappedinMapId: string;
  buildingId: string;
  floors: {
    id: number;
    name: string;
    mappedinFloorId: string | null;
  }[];
}

interface BuildingState {
  buildingData: BuildingData | null;
  selectedFloorId: string | null;
  specialAction: {
    action: string;
    spaceId: string;
    floorId: string;
  } | null;
  isLoading: boolean;
  error: Error | null;
}

export function useBuildingData() {
  const [state, setState] = useState<BuildingState>({
    buildingData: null,
    selectedFloorId: null,
    specialAction: null,
    isLoading: true,
    error: null,
  });
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  // Efecto para manejar los parámetros de URL
  useEffect(() => {
    const action = searchParams.get("action");
    const spaceId = searchParams.get("spaceId");
    const floorId = searchParams.get("floorId");

    if (floorId && (action === "locate" || action === "nearestRoute")) {
      console.log("Setting floor from URL params:", floorId);
      setState((prev) => ({
        ...prev,
        selectedFloorId: floorId,
        specialAction: { action, spaceId: spaceId!, floorId },
      }));
    }
  }, [searchParams]);

  // Efecto para cargar los datos del edificio
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setState((prev) => ({
          ...prev,
          error: new Error("No user found"),
          isLoading: false,
        }));
        return;
      }

      try {
        const userProfile = await fetchUserProfile(user.id);

        if (!userProfile.mappedinMapId || !userProfile.buildingId) {
          throw new Error("Missing required building information");
        }

        const buildingFloors = await buildingFloorsService(
          userProfile.buildingId.toString(),
        );

        if (!buildingFloors?.floors?.length) {
          throw new Error("No floors found for this building");
        }

        const sortedFloors = [...buildingFloors.floors].sort((a, b) => a.id - b.id);

        const newBuildingData = {
          mappedinMapId: userProfile.mappedinMapId,
          buildingId: userProfile.buildingId.toString(),
          floors: sortedFloors.map((floor) => ({
            id: floor.id,
            name: floor.name,
            mappedinFloorId: floor.mappedin_floor_id,
          })),
        };

        setState((prev) => {
          const hasFloorParam = searchParams.get("floorId");
          const newSelectedFloorId =
            prev.selectedFloorId ||
            (!hasFloorParam && sortedFloors[0].mappedin_floor_id
              ? sortedFloors[0].mappedin_floor_id
              : null);

          return {
            ...prev,
            buildingData: newBuildingData,
            selectedFloorId: newSelectedFloorId,
            isLoading: false,
          };
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err : new Error(String(err)),
          isLoading: false,
        }));
      }
    };

    fetchData();
  }, [user, searchParams]);

  const setSelectedFloorId = (floorId: string | null) => {
    setState((prev) => ({ ...prev, selectedFloorId: floorId }));
  };

  return {
    ...state,
    setSelectedFloorId,
  };
}
