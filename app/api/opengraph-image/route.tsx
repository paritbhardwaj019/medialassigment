import { formatDate } from "@/lib/formateDate";
import { getPostFromSlug } from "@/lib/getPostFromSlug";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("slug") as string;
  const POST = getPostFromSlug(slug);

  const [outfitSemibold, outfitRegular, outfitLight] = await Promise.all([
    fetch(
      new URL("../../assets/fonts/Outfit-SemiBold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL("../../assets/fonts/Outfit-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer()),
    fetch(new URL("../../assets/fonts/Outfit-Light.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
  ]);

  return new ImageResponse(
    (
      <div tw="p-10 bg-[#dfe6e9] flex flex-col justify-between h-full w-full">
        <div tw="flex items-center justify-between">
          <h3 className="font-semibold">COMPANY LOGO</h3>
          <p>{formatDate(POST?.date)}</p>
        </div>
        <main tw="flex flex-col">
          <h1 tw="text-6xl mt-10">{POST?.title}</h1>
          <p tw="text-xl font-light">{POST?.content}</p>
        </main>
        <p>By {POST?.author}</p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Outfit",
          data: outfitSemibold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Outfit",
          data: outfitRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Outfit",
          data: outfitLight,
          style: "normal",
          weight: 300,
        },
      ],
    }
  );
}
