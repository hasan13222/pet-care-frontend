"use client";
import { useCheckLoginQuery } from "@/redux/api/authApi";
import { CustomError } from "@/types/errorType";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SinglePost from "./SinglePost";
import { useGetAllPostsQuery } from "@/redux/api/postApi";
import { useRouter } from "next/navigation";

const Posts = () => {
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(2);
    const { data: userData } = useCheckLoginQuery(undefined);  

  

 
  const router = useRouter();

  const {
    data: items,
    isError,
    error,
  } = useGetAllPostsQuery({ token: userData?.data.token, limit });

  async function loadData() {
    if (items?.data?.length < limit) {
      setHasMore(false);
    } else {
      setLimit((prev) => prev + 2);
    }
  }

  useEffect(() => {
    loadData();
  }, [userData]);
  return (
    <>
      <InfiniteScroll
        dataLength={limit}
        next={loadData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        {items?.data.map((item: any) => (
          <SinglePost postInfo={item} />
        ))}
      </InfiniteScroll>
      {isError && <p>Error: {(error as CustomError).data.message}</p>}
    </>
  );
};

export default Posts;
