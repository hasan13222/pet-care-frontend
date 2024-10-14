"use client";
import SinglePost from "@/components/shared/SinglePost";
import { useCheckLoginQuery } from "@/redux/api/authApi";
import { useGetMyPostsQuery } from "@/redux/api/postApi";
import { Fragment, useEffect, useState } from "react";

const Myposts = () => {
    const { data: userData } = useCheckLoginQuery(undefined);   
  const { data: posts } = useGetMyPostsQuery(userData?.data.token);
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
