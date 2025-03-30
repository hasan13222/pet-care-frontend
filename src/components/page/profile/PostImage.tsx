"use client";
import Image from "next/image";
import React from "react";

const PostImage = ({ postImages }: any) => {
  console.log(postImages)
  return (
    <>
      <div className={`images grid ${postImages?.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {postImages.map((item: string) => (
          <Image className="object-cover w-full max-h-[200px]" src={item} width={250} height={200} alt="post attachment" />
        ))}
      </div>
    </>
  );
};

export default PostImage;
