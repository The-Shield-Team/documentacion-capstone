import { supabase } from "@/lib/supabase";

export interface Device {
  id: string;
  name: string;
  status: "available" | "occupied" | "unavailable" | "deleted";
  rooms?: {
    name: string;
    mappedin_space_id: string;
    floors: {
      id: number;
      name: string;
      mappedin_floor_id: string;
      buildings: {
        profiles: {
          id: string;
        }[];
      }[];
    }[];
  };
  profiles?: {
    id: string;
    full_name: string;
  }[];
}

export interface DeviceDetails {
  deviceId: number;
  deviceName: string;
  status: string;
  roomName: string;
  userId: string;
  userName: string;
  qr_uuid: string;
  mappedinData: {
    spaceId: string;
    floorId: string;
  };
}

export const deviceService = {
  getAllBuildingDevices: async (userId: string): Promise<Device[]> => {
    const { data, error } = await supabase
      .from("devices")
      .select(
        `
					id,
					name,
					status,
					rooms!inner (
						name,
						mappedin_space_id,
						floors!inner (
							id,
							mappedin_floor_id,
							name,
							buildings!inner (
								profiles!inner (
									id
								)
							)
						)
					)
				`,
      )
      .eq("rooms.floors.buildings.profiles.id", userId);

    if (error) {
      console.error("Error fetching devices:", error);
      throw error;
    }

    return data as unknown as Device[];
  },

  getDeviceDetails: async (deviceName: string): Promise<DeviceDetails> => {
    try {
      const { data, error } = await supabase
        .from("devices")
        .select(
          `
						id,
						name,
						status,
						qr_uuid,
						rooms (
							name,
							mappedin_space_id,
							floors!inner (
								id,
								mappedin_floor_id,
								name
							)
						),
						profiles (
							id,
							full_name
						)
					`,
        )
        .eq("name", deviceName)
        .single();

      if (error) throw error;

      return {
        deviceId: data.id,
        deviceName: data.name,
        status: data.status,
        qr_uuid: data.qr_uuid || "",
        roomName: data.rooms?.name || "",
        userId: data.profiles?.id || "",
        userName: data.profiles?.full_name || "",
        mappedinData: {
          spaceId: data.rooms?.mappedin_space_id || "",
          floorId: data.rooms?.floors?.mappedin_floor_id || "",
        },
      };
    } catch (error) {
      console.error("Error fetching device details:", error);
      throw error;
    }
  },

  formatDeviceDetails: (device: Device): DeviceDetails => {
    return {
      deviceId: device.id,
      deviceName: device.name,
      status: device.status,
      qr_uuid: device.qr_uuid,
      roomName: device.rooms?.name || "",
      userId: device.profiles?.id || "",
      userName: device.profiles?.full_name || "",
      mappedinData: {
        spaceId: device.rooms?.mappedin_space_id || "",
        floorId: device.rooms?.floors?.mappedin_floor_id || "",
      },
    };
  },
};
