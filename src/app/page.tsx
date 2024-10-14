import Image from "next/image";
import avatar from "@/assets/images/man.png";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { HiBadgeCheck } from "react-icons/hi";
import { FaSortAmountUp } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PostEditor from "@/components/form/PostEditor";
import SinglePost from "@/components/shared/SinglePost";
import Posts from "@/components/shared/Posts";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center my-3">
        <div className="post__items max-w-[600px]">
          <div className="search_filter flex justify-between items-center mb-2">
            <div className="flex gap-2 items-center">
              <Select defaultValue="0">
                <SelectTrigger className="w-[180px] h-[35px] text-gray-500">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent color="green">
                  <SelectItem value="0">Filter Post Type</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="tip">Tips</SelectItem>
                </SelectContent>
              </Select>
              <div className="border p-2 rounded-md cursor-pointer">
                <FaSortAmountUp className="text-gray-500" />
              </div>
            </div>

            <div className="">
              <div className="relative">
                <input
                  placeholder="Search Here..."
                  className="border text-sm border-solid border-black/[.08] dark:border-white/[.145] transition-colors w-full pl-2 p-[7px] rounded-md focus:outline-none focus:border-primary"
                />
                <Button
                  size="sm"
                  className="bg-primary absolute px-2 h-7 right-[3px] top-[3px]"
                  variant="default"
                >
                  <CiSearch />
                </Button>
              </div>
            </div>
          </div>
          <div className="create_post border rounded-md mb-4 p-4 flex gap-3 items-start">
            <Image
              className="rounded-full border-2 border-secondary cursor-pointer"
              src={avatar}
              width={40}
              height={40}
              alt="profile picture"
            />
            <div className="post_form flex flex-col gap-2 w-full">
              <PostEditor/>
              
            </div>
          </div>
          
          <Posts/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
