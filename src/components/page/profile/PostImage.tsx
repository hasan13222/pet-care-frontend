"use client";
import Image from "next/image";
import React from "react";

const PostImage = ({ postImages }: any) => {
  return (
    <>
      <div className="images grid grid-cols-2">
        {postImages.map((item: string) => (
          <Image src={item} width={250} height={200} alt="post attachment" />
        ))}
      </div>
    </>
  );
};

export default PostImage;
