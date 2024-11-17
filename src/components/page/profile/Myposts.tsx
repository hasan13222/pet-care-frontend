import SinglePost from "@/components/shared/SinglePost";
import { axiosSecure } from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import { Fragment, useEffect, useState } from "react";

const Myposts = async () => {
  // const { data: posts } = await axiosSecure.get("/api/posts/my-post");
  const accessToken = cookies().get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_VITE_BASEAPI}/api/posts/my-post`, {
    credentials: "include",
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { tags: ["my-post"] },
  });
  const posts = await res.json();

  return (
    <>
      {posts?.data?.map((post: any) => (
        <Fragment key={post._id}>
          <SinglePost postInfo={post} editOption={true} />
        </Fragment>
      ))}
    </>
  );
};

export default Myposts;
