"use client";
import SinglePost from "@/components/shared/SinglePost";
import { AuthContext } from "@/provider/AuthProvider";
import { useGetUserPostsQuery } from "@/redux/api/postApi";
import { Fragment, useContext, useEffect, useState } from "react";

const Userposts = ({ userId }: any) => {
  const { user: userData } = useContext(AuthContext);

  const { data: posts } = useGetUserPostsQuery({
    token: userData?.data.token,
    userId,
  });
  return (
    <>
      {posts?.data?.map((post: any) => (
        <Fragment key={post._id}>
          <SinglePost postInfo={post} />
        </Fragment>
      ))}
    </>
  );
};

export default Userposts;
