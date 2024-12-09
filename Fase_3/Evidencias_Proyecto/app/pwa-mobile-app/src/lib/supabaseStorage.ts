import { supabase } from "./supabase";

export async function getPublicUrl(
  path: string,
  bucket: string = "public-bucket",
): Promise<string> {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error) throw error;

    return new Promise<string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = reject;
      fr.readAsDataURL(data);
    });
  } catch (error) {
    console.error("Error getting public URL:", error);
    throw error;
  }
}
