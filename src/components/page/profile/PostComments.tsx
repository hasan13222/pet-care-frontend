"use client";
import Image from "next/image";
import ReactHTMLParser from "html-react-parser";
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
import avatar from "@/assets/images/man.png";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { AuthContext } from "@/provider/AuthProvider";
import { useInteractPost } from "@/hooks/post.hooks";
import { useGetMyProfile } from "@/hooks/user.hooks";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const PostComments = ({ postInfo }: any) => {
  
  const { data: userData } = useGetMyProfile();
  const [alertOpen, setAlertOpen] = useState("");
  const [value, setValue] = useState("");

  const {mutate: interactPost} = useInteractPost(postInfo._id);

  const handleChange = (val: string) => {
    setValue(val);
  };
  const handleEditComment = (newInteraction: any) => {
    setAlertOpen("close");
    interactPost({
      postBody: newInteraction,
      query: { updateComment: "edit" },
    });
  };

  const handleDeleteComment = (newInteraction: any) => {
    interactPost({
      postBody: newInteraction,
      query: { updateComment: "delete" },
    });
  };
  return (
    <>
      <div className="comments my-2">
        <h2 className="text-base font-medium">Comments</h2>
        {postInfo.comments.map((comment: any) => (
          <div className="comment_single border-b my-2">
            <div className="comment_header">
              <div className="user flex items-center gap-2">
                <Image
                  className="rounded-full border-2 border-secondary cursor-pointer"
                  src={comment?.userId?.profile_picture || avatar}
                  width={35}
                  height={35}
                  alt="profile picture"
                />
                <div className="user_details">
                  <h3 className="text-sm font-medium">
                    {comment.userId?.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    
                    {moment(comment.userId?.createdAt).format(
                      "MM-DD-YY, h:mm:ss a"
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="comment_body my-2 text-sm">
              {ReactHTMLParser(comment.comment)}
            </div>
            {comment.userId?._id === userData?.data._id && (
              <div className="comment_footer flex gap-2 my-2">
                <AlertDialog
                  onOpenChange={() => setAlertOpen("open")}
                  open={alertOpen === "close" ? false : undefined}
                >
                  <AlertDialogTrigger asChild>
                    <button className="text-sm text-orange-300 hover:text-gray-800">
                      Edit
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogDescription className="overflow-auto">
                        <ReactQuill
                          defaultValue={comment.comment}
                          onChange={handleChange}
                        />
                        <div className="flex justify-between mt-5">
                          <Button
                            onClick={() =>
                              handleEditComment({
                                comments: {
                                  comment: value,
                                  userId: userData.data?._id,
                                  _id: comment?._id
                                },
                              })
                            }
                            size="lg"
                            className="bg-primary font-bold"
                            type="submit"
                          >
                            Update
                          </Button>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {/* <button className="text-sm text-orange-300 hover:text-gray-800">
                Edit
              </button> */}
                <button
                  onClick={() =>
                    handleDeleteComment({
                      comments: {
                        _id: comment?._id,
                      },
                    })
                  }
                  className="text-sm border-l pl-2 text-red-400 hover:text-gray-800"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PostComments;
