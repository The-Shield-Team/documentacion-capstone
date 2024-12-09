import { supabase } from "@/lib/supabase";

export const fetchUserReports = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select(
        `
        id,
        created_at,
        description,
        devices (
					id,
					name
				)
      `,
      )
      .eq("profile_id", userId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user Reports:", error);
    throw error;
  }
};

export const createUserReport = async (
  userId: string,
  deviceId: number,
  description: string,
) => {
  try {
    const { data, error } = await supabase.from("reports").insert([
      {
        profile_id: userId,
        device_id: deviceId,
        description: description,
      },
    ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating user report:", error);
    throw error;
  }
};
