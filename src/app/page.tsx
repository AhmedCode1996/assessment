import Content from "@/components/Content";
import { getImages } from "./actions";

export default async function Home() {
  const initialImages = await getImages();

  return <Content initialImages={initialImages} />;
}
