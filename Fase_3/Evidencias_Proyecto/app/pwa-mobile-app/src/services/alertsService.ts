import { supabase } from "@/lib/supabase";

export const fetchAlerts = async () => {
  try {
    const { data, error } = await supabase.from("notifications").select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user Reports:", error);
    throw error;
  }
};
