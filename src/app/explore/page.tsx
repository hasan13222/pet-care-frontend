"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import avatar from "@/assets/images/man.png";

const page = () => {
  return (
    <div className="container mx-auto">
      <main className="flex flex-col gap-5 items-center my-7">
        <div className="max-w-[600px] w-auto lg:w-[400px]">
          <div className="following">
            <h3>
              Following{" "}
              <Button size="sm" className="h-[22px] bg-secondary px-[6px]" variant="secondary">
                      30
                    </Button>
            </h3>
          </div>
          <div className="explore__users mt-3">
            <h3 className="text-base border-b pb-1">
              Explore Other Pet Lovers
            </h3>
            <div className="users">
              <div className="user__single flex justify-between items-center my-5">
                <div className="user flex items-center gap-2">
                  <Image
                    className="rounded-full border-2 border-secondary cursor-pointer"
                    src={avatar}
                    width={35}
                    height={35}
                    alt="profile picture"
                  />
                  <div className="user_details">
                    <h3 className="text-sm font-medium">John Doe</h3>
                    <p className="text-xs text-gray-600">
                      joined on January 1, 2022
                    </p>
                  </div>
                </div>
                <div className="follow">
                    <Button size="sm" className="bg-primary">Follow</Button>
                </div>
              </div>
              <div className="user__single flex justify-between items-center my-5">
                <div className="user flex items-center gap-2">
                  <Image
                    className="rounded-full border-2 border-secondary cursor-pointer"
                    src={avatar}
                    width={35}
                    height={35}
                    alt="profile picture"
                  />
                  <div className="user_details">
                    <h3 className="text-sm font-medium">John Doe</h3>
                    <p className="text-xs text-gray-600">
                      joined on January 1, 2022
                    </p>
                  </div>
                </div>
                <div className="follow">
                    <Button size="sm" className="bg-primary">Follow</Button>
                </div>
              </div>
              <div className="user__single flex justify-between items-center my-5">
                <div className="user flex items-center gap-2">
                  <Image
                    className="rounded-full border-2 border-secondary cursor-pointer"
                    src={avatar}
                    width={35}
                    height={35}
                    alt="profile picture"
                  />
                  <div className="user_details">
                    <h3 className="text-sm font-medium">John Doe</h3>
                    <p className="text-xs text-gray-600">
                      joined on January 1, 2022
                    </p>
                  </div>
                </div>
                <div className="follow">
                    <Button size="sm" className="bg-primary">Follow</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
