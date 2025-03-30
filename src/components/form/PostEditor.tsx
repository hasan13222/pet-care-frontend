"use client";
import { useRef, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useCreatePost } from "@/hooks/post.hooks";
import { TPost } from "@/services/postService";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostEditor = () => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const handleChange = (content: string) => {
    setValue(content);
  };
  const postAttachmentRef = useRef<HTMLInputElement>(null);

 
  // const [createPost, { isError, error }] = useCreatePostMutation();
  const {mutate: createPost } = useCreatePost();

  function handlePremium(val: any) {
    setIsPremium(val);
  }

  async function handleCreatePost() {
    let image_attachments: string[] = [];
    if (!category || category === "0") {
        alert("Please select a category");
        return;
    }
    if (postAttachmentRef?.current?.files instanceof FileList) {
        if (!postAttachmentRef?.current?.files[0] && (!value || value=== "<p><br></p>")) {
            toast({ title: "Post can not be empty" });
            return;
        }

        toast({ title: "Post is uploading..." });
        const imageAttachmentFiles = Array.from(postAttachmentRef?.current?.files);

        // Create an array of promises for image uploads
        const uploadPromises = imageAttachmentFiles.map(async (item) => {
            const formData = new FormData();
            formData.append("image", item);

            const imgData = await axios.post(
                `https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            return imgData.data.data.display_url; // Return the uploaded image URL
        });

        // Wait for all uploads to complete
        image_attachments = await Promise.all(uploadPromises);
    }

    const newPost: TPost = {
        description: value,
        type: isPremium ? "premium" : "regular",
        category,
        image_attachments,
    };


    await createPost(newPost);
    setValue("")
    // const createdPost = await createPost({
    //     token: userData?.data?.token,
    //     postBody: newPost,
    // });

    // if (createdPost.data) {
    //     toast({ title: "Post Uploaded successfully" });
    // }
}


  // if (isError) {
  //   toast({
  //     title: "Something went wrong",
  //     description: (error as CustomError).data.message,
  //   });
  // }
  return (
    <>
      <ReactQuill value={value} onChange={handleChange} />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Select
            onValueChange={(value) => setCategory(value)}
            defaultValue="story"
          >
            <SelectTrigger className="h-[35px] text-gray-500">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent color="green">
              <SelectItem value="0">Post Type</SelectItem>
              <SelectItem value="story">Story</SelectItem>
              <SelectItem value="tip">Tips</SelectItem>
            </SelectContent>
          </Select>

          <Checkbox
            onCheckedChange={(value) => handlePremium(value)}
            id="terms"
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Premium
          </label>
        </div>

        <Button
          onClick={handleCreatePost}
          size="sm"
          className="bg-primary"
          variant="default"
        >
          Post
        </Button>
      </div>
      <div>
        <input
          ref={postAttachmentRef}
          multiple
          type="file"
          className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-primary
                    hover:file:bg-violet-100"
        />
      </div>
    </>
  );
};

export default PostEditor;
