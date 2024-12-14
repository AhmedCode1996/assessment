import Content from "@/components/Content";
import { getCategories, getImages } from "./actions";

export default async function Home() {
  const initialImages = await getImages();
  const initialCategories = await getCategories();

  return <Content initialData={{ initialImages, initialCategories }} />;
}
