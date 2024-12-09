import { supabase } from "@/lib/supabase";

export const fetchUserFavorites = async (userId: string) => {
  try {
    console.log("empezamos")
    const { data, error } = await supabase
      .from("favorites")
      .select(
        `
        *,
        devices (
					id,
					name,
          rooms(
            id,
            floor(
              id,
              mappedin_floor_id
            ),
            mappedin_space_id
          )
				)
      `
      )
      .eq("profile_id", userId)
    console.log(data)
    if (error) throw error;
    return data
  } catch (error) {
    console.error("Error fetching user Reports:", error);
    throw error;
  }
};

export const createFavorite = async (
  userId: string,
  deviceId: number,
) => {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          profile_id: userId,
          device_id: deviceId,
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating user favorites:", error);
    throw error;
  }
};

export const deleteFavorite = async (favoriteId: number) => {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", favoriteId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw error;
  }
};