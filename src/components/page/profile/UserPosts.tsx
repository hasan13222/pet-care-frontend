import SinglePost from "@/components/shared/SinglePost";
import { getUserPosts } from "@/services/postService";
import { Fragment } from "react";

const Userposts = async ({ userId }: any) => {
  const posts = await getUserPosts(userId);
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
