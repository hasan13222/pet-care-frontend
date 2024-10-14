"use client";
import SinglePost from "@/components/shared/SinglePost";
import { useCheckLoginQuery } from "@/redux/api/authApi";
import { useGetUserPostsQuery } from "@/redux/api/postApi";
import { Fragment, useEffect, useState } from "react";

const Userposts = ({userId}:any) => {
    const { data: userData } = useCheckLoginQuery(undefined);  

   

 
  const { data: posts } = useGetUserPostsQuery({token: userData?.data.token, userId});
  return (
    <>
      {posts?.data?.map((post: any) => (
        <Fragment key={post._id}>
          <SinglePost postInfo={post}/>
        </Fragment>
      ))}
    </>
  );
};

export default Userposts;
