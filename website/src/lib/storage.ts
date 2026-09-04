import { createClientSupabase } from "@/lib/supabase/client";

export async function uploadImage(file: File, folder?: string): Promise<string> {
  const supabase = createClientSupabase();
  const fileExt = file.name.split(".").pop() || "jpg";
  const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const fileName = folder ? `${folder}/${uniqueId}.${fileExt}` : `${uniqueId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("website-images")
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from("website-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
