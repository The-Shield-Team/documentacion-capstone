import { supabase } from "@/lib/supabase";

export interface DevicesOnFloor {
  id: number;
  name: string;
  status: string;
  rooms: {
    name: string;
    mappedin_space_id: string;
    floors: {
      building_id: number;
    };
  };
}

export const devicesOnFloorService = async (
  floorId: string,
): Promise<{ devicesOnFloor: DevicesOnFloor[] }> => {
  // 	SELECT
  // d.id,
  // d.name,
  // d.status,
  // r.mappedin_space_id
  // FROM
  // devices d
  // INNER JOIN rooms r ON d.room_id = r.id
  // INNER JOIN floors f ON r.floor = f.id
  // INNER JOIN buildings b ON f.building_id = b.id
  // WHERE b.id = 1
  // AND f.id = 1;

  try {
    const { data, error } = await supabase
      .from("devices")
      .select(
        `
				id,
				name,
				status,
				rooms!inner(
					name,
					mappedin_space_id,
					floors!inner(
						building_id
					)
				)
				`,
      )
      .eq("rooms.floors.mappedin_floor_id", floorId);
    if (error) throw error;
    return {
      devicesOnFloor: data as unknown as DevicesOnFloor[],
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
