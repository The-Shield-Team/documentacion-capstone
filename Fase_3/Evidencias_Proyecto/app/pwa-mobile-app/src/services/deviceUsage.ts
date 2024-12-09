import { supabase } from "@/lib/supabase";

export const deviceUsage = {
  start: async (deviceId: number, userId: string) => {
    console.log(
      "Starting device usage for deviceId:",
      deviceId,
      "and userId:",
      userId,
    );
    const { data, error } = await supabase
      .from("devices")
      .update({ status: "occupied", profile_id: userId })
      .eq("id", deviceId);

    if (error) throw error;
    return data;
  },

  stop: async (deviceId: number) => {
    const { data, error } = await supabase
      .from("devices")
      .update({ status: "available", profile_id: null })
      .eq("id", deviceId);

    if (error) throw error;
    return data;
  },
};


export const fetchLastUsedDevices = async (profileId: string) => {
  try {
    // Paso 1: Obtener todos los registros filtrados por `profile_id`, ordenados por `created_at`
    const { data, error } = await supabase
      .from("usage_history")
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
				`,
      )
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!data) return [];

    // Paso 2: Agrupar por `device_id` eliminando secuencias de uso continuo
    const uniqueDevices = [];
    let lastDeviceId = null;

    for (const record of data) {
      if (record.device_id !== lastDeviceId) {
        uniqueDevices.push(record);
        lastDeviceId = record.device_id;
      }
    }

    // Paso 3: Tomar solo los últimos 10 dispositivos únicos
    return uniqueDevices.slice(0, 10);

  } catch (error) {
    console.error("Error fetching last used devices:", error);
    throw error;
  }
};


