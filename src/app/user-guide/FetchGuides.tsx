import { client } from "@/sanity/lib/client";
export async function fetchGuides() {
  const guides = await client.fetch(`
    *[_type == "guide"] {
      title,
      content,
      slug,
      metaTitle,
      metaDescription
    }
  `);

  return guides; 
}