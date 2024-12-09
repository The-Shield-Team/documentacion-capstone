import { supabase } from "@/lib/supabase";

export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
				full_name,
				medical_role,
				sex,
				buildings (
					id,
					name,
					mappedin_map_id
				)
			`,
      )
      .eq("id", userId)
      .single();

    if (error) throw error;
    return {
      userFullName: data.full_name || "",
      buildingId: data.buildings?.id || "",
      buildingName: data.buildings?.name || "",
      mappedinMapId: data.buildings?.mappedin_map_id || "",
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
