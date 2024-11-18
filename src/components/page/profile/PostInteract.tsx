"use client";
import { useContext, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { AuthContext } from "@/provider/AuthProvider";
import { useInteractPost } from "@/hooks/post.hooks";
import { useGetMyProfile } from "@/hooks/user.hooks";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const PostInteract = ({ postInfo }: any) => {

  const { data: userData } = useGetMyProfile();

 
  const [isUserUpvoted, setIsUserUpvoted] = useState(false);
  const [isUserDownvoted, setIsUserDownvoted] = useState(false);
  const [isUserCommented, setIsUserCommented] = useState(false);
  const [alertOpen, setAlertOpen] = useState("");
  const [value, setValue] = useState("");

  const {mutate: interactPost} = useInteractPost(postInfo._id);

  const handleChange = (val: string) => {
    setValue(val);
  };
  const handleInteract = (newInteraction: any) => {
    setAlertOpen("close");
    if(isUserUpvoted && newInteraction.upvote){
      return;
    }
    if(isUserDownvoted && newInteraction.downvote){
      return;
    }
    interactPost({
      postBody: newInteraction,
      query: { upvoted: isUserUpvoted, downvoted: isUserDownvoted },
    });
    
  };

  useEffect(() => {
    const isUserUpvotedRes = postInfo.upvote.some(
      (item: string) => {
        return item === userData?.data?._id
      }
    );
    setIsUserUpvoted(isUserUpvotedRes);
    const isUserDownvotedRes = postInfo.downvote.some(
      (item: string) => item === userData?.data?._id
    );
    setIsUserDownvoted(isUserDownvotedRes);
    const isUserCommentedRes = postInfo.comments.some(
      (item: any) => item.userId === userData?.data?._id
    );
    setIsUserCommented(isUserCommentedRes);
  }, [userData, postInfo]);

  return (
    <>
      <div className="post_footer border-b my-2">
        <div className="post_actions flex gap-2 my-2">
          <button
            onClick={() => handleInteract({ upvote: userData?.data?._id })}
            className={`text-sm font-medium ${
              isUserUpvoted ? "text-primary" : "text-gray-800"
            } `}
          >
            {postInfo.upvote.length } Upvote
          </button>
          <button
            onClick={() => handleInteract({ downvote: userData?.data?._id })}
            className={`text-sm border-l pl-2 font-medium ${
              isUserDownvoted ? "text-accent" : "text-gray-800"
            } `}
          >
            {postInfo.downvote.length } Downvote
          </button>
          <AlertDialog
            onOpenChange={() => setAlertOpen("open")}
            open={alertOpen === "close" ? false : undefined}
          >
            <AlertDialogTrigger asChild>
              <button
                className={`text-sm border-l pl-2 font-medium ${
                  isUserCommented ? "text-secondary" : "text-gray-800"
                } `}
              >
                {postInfo.comments.length }{" "}
                Comments
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogDescription className="overflow-auto">
                  <ReactQuill value={value} onChange={handleChange} />
                  <div className="flex justify-between mt-5">
                    <Button
                      onClick={() =>
                        handleInteract({
                          comments: {
                            userId: userData?.data?._id,
                            comment: value,
                          },
                        })
                      }
                      size="lg"
                      className="bg-primary font-bold"
                      type="submit"
                    >
                      Comment
                    </Button>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default PostInteract;
