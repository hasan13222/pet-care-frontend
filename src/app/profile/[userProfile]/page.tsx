"use client";
import Image from "next/image";
import avatar from "@/assets/images/man.png";
import { Button } from "@/components/ui/button";
import ProfileEditComp from "@/components/page/profile/ProfileEditComp";
import SinglePost from "@/components/shared/SinglePost";
import PostEditor from "@/components/form/PostEditor";
import { Fragment, useEffect, useState } from "react";
import Posts from "@/components/shared/Posts";
import Myposts from "@/components/page/profile/Myposts";
import Userposts from "@/components/page/profile/UserPosts";
import { useGetUserProfileQuery } from "@/redux/api/userApi";
import { useCheckLoginQuery } from "@/redux/api/authApi";

export default function page({ params }: any) {
  const {data: userData} = useCheckLoginQuery(undefined);
  const {data: user} = useGetUserProfileQuery({
    token: userData?.data.token,
    userId: params.userProfile,
  });

  
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center my-3">
        <div className="post__items max-w-[600px]">
          <div className="post_header flex items-center border p-5 rounded-md mb-3">
            <div className="user flex items-end gap-5">
              <Image
                className="rounded-full border-2 border-secondary cursor-pointer"
                src={user?.data?.profile_picture || avatar}
                width={200}
                height={200}
                alt="profile picture"
              />
              <div className="flex flex-col gap-2 pb-4">
                <h3 className="text-lg font-medium flex gap-2 items-center">
                  <span>{user?.data?.name}</span>{" "}
                </h3>
                <p>{user?.data?.phone}</p>
                <p>{user?.data?.address}</p>
                <div className="following">
                  <h3>
                    Following{" "}
                    <Button
                      size="sm"
                      className="h-[22px] bg-secondary px-[6px]"
                      variant="secondary"
                    >
                      30
                    </Button>
                  </h3>
                </div>
                <div className="followers">
                  <h3>
                    Followers{" "}
                    <Button
                      size="sm"
                      className="h-[22px] bg-secondary px-[6px]"
                      variant="secondary"
                    >
                      300
                    </Button>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <Userposts userId={params.userProfile} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
