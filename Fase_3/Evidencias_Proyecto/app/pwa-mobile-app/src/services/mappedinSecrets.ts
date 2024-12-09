import { supabase } from "@/lib/supabase";

export interface MappedinSecrets {
	mappedin_client: string;
	mappedin_sec: string;
}

export const fetchMappedinSecrets = async () => {
	try {
		const { data, error } = await supabase.from("mappedin_configuration").select(
			`mappedin_client, mappedin_sec`
		).single();
		if (error) throw error;
		return data as MappedinSecrets;
	} catch (error) {
		console.error("Error fetching Mappedin Secrets:", error);
		throw error;
	}
};
