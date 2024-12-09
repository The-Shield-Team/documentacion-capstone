import { supabase } from "@/lib/supabase";

export const buildingFloorsService = async (buildingId: string) => {
  try {
    const { data, error } = await supabase
      .from("floors")
      .select(
        `
				id,
				name,
				mappedin_floor_id
				`,
      )
      .eq("building_id", buildingId);

    if (error) throw error;
    return {
      floors: data || [],
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
