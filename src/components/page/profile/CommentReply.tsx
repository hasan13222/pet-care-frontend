"use client"
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
import ReactHTMLParser from "html-react-parser";
import Image from "next/image";
import avatar from "@/assets/images/man.png"
import { useGetMyProfile } from "@/hooks/user.hooks";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useInteractPost } from "@/hooks/post.hooks";
import moment from "moment";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CommentReply({ reply, postId, commentId }: any) {
    const [alertOpen, setAlertOpen] = useState("");
    const [value, setValue] = useState("");

    const { data: userData } = useGetMyProfile();

    const { mutate: interactPost } = useInteractPost(postId);


    const handleChange = (val: string) => {
        setValue(val);
    };


    const handleEditReply = (newInteraction: any) => {
        setAlertOpen("close");
        interactPost({
            postBody: newInteraction,
            query: { updateReply: "edit" },
        });
    };

    const handleDeleteReply = (newInteraction: any) => {
        interactPost({
            postBody: newInteraction,
            query: { updateReply: "delete" },
        });
    };

    console.log(reply)
    return (
        <div className="comment_single border-b my-2">
            <div className="comment_header">
                <div className="user flex items-start gap-2">
                    <Image
                        className="rounded-full border-2 border-secondary cursor-pointer"
                        src={reply?.userId?.profile_picture || avatar}
                        width={35}
                        height={35}
                        alt="profile picture"
                    />
                    <div className="user_details bg-gray-400/10 rounded-md flex-1 mb-2 py-2 px-3">
                        <h3 className="text-sm font-medium">
                            {reply?.userId?.name || "Anonymous"} <span className="font-normal text-[10px]">{moment(reply?.userId?.createdAt).format(
                                "MM-DD-YY, h:mm:ss a"
                            )}</span>
                        </h3>

                        <div className="comment_body text-sm">
                            {ReactHTMLParser(reply?.reply)}
                        </div>
                        {reply?.userId?._id === userData?.data._id && (
                            <div className="comment_footer flex gap-2">
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
                                                    defaultValue={reply?.reply}
                                                    onChange={handleChange}
                                                />
                                                <div className="flex justify-between mt-5">
                                                    <Button
                                                        onClick={() =>
                                                            handleEditReply({
                                                                replies: {
                                                                    reply: value,
                                                                    userId: userData.data?._id,
                                                                    _id: reply?._id,
                                                                    commentId
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
                                <button
                                    onClick={() =>
                                        handleDeleteReply({
                                            replies: {
                                                _id: reply?._id,
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
                </div>
            </div>

        </div>
    )
}
