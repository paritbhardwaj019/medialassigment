"use client";

import { type Post } from "@/types/index";
import { Tag } from "./tag";
import { useRouter } from "next/navigation";
import { MdOutlineLink } from "react-icons/md";

export const PostCard = ({ title, content, tags, author, slug }: Post) => {
  const router = useRouter();

  const handleClick = () => router.push("/post/" + slug);

  const SHARE_LINKS = [
    {
      icon: MdOutlineLink,
      href: process.env.NEXT_PUBLIC_SITE_URL + "/post/" + slug,
    },
  ];

  return (
    <div
      className="bg-white shadow-md shadow-black/10 rounded-md p-4 text-black hover:scale-105 transition-all duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm font-light">{content.slice(0, 120)}...</p>
      <div className="flex items-center gap-2 flex-wrap mt-4">
        {tags.map((el, index) => (
          <Tag key={index} tag={el} />
        ))}
      </div>
      <p className="text-xs mt-4">
        By <span className="underline ">{author}</span>
      </p>

      <div className="flex items-center gap-2 flex-wrap mt-4">
        {SHARE_LINKS.map((el) => (
          <div
            className="rounded-full border hover:bg-gray-200/30 p-2"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(el.href);
              alert("Link copied to clipboard!");
            }}
          >
            <el.icon size={14} />
          </div>
        ))}
      </div>
    </div>
  );
};
