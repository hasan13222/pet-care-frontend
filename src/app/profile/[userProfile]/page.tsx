import Image from "next/image";
import avatar from "@/assets/images/man.png";
import { Button } from "@/components/ui/button";
import Userposts from "@/components/page/profile/UserPosts";
import { getUserFollowers, getUserProfile } from "@/services/userService";
import Link from "next/link";

export default async function page({ params }: any) {
  const { data: user } = await getUserProfile(params.userProfile);
  const followers = await getUserFollowers(user?._id)
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center my-3">
        <div className="post__items max-w-[600px] min-w-auto sm:min-w-[400px] md:min-w-[600px]">
          <div className="post_header flex items-center border p-5 rounded-md mb-3">
            <div className="user flex items-end gap-5">
              <Image
                className="rounded-full border-2 border-secondary cursor-pointer"
                src={user?.profile_picture || avatar}
                width={200}
                height={200}
                alt="profile picture"
              />
              <div className="flex flex-col gap-2 pb-4">
                <h3 className="text-lg font-medium flex gap-2 items-center">
                  <span>{user?.name}</span>{" "}
                </h3>
                <p>{user?.phone}</p>
                <p>{user?.address}</p>
                <div className="following">
                  <h3>
                    Following{" "}
                    <Button
                      size="sm"
                      className="h-[22px] bg-secondary px-[6px]"
                      variant="secondary"
                    >
                      <Link href={`/following/${user?._id}`}>{user?.following?.length}</Link>
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
                      <Link href={`/followers/${user?._id}`}>{followers?.data?.length}</Link>
                      
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
