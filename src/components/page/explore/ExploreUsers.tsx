import Image from "next/image";
import avatar from "@/assets/images/man.png";
import { axiosSecure } from "@/lib/axiosInstance";
import { getAllUsers } from "@/services/userService";
import FollowUser from "@/components/page/explore/FollowUser";
import VisitUserProfile from "@/components/page/explore/VisitUserProfile";
import moment from "moment";

export default async function ExploreUsers() {
    const { data: user } = await axiosSecure.get("/api/users/me");
    const userFollowing = user?.data?.following?.map((item: any) => item._id);
    const alluser = await getAllUsers();
    return (
        <div className="explore__users min-w-[260px]">
            <h3 className="text-xl border-b pb-1 font-semibold">
                You May Follow
            </h3>
            <div className="users">
                {alluser?.data?.filter((item: any) => !userFollowing.includes(item._id) && (user?.data?._id !== item._id)).length === 0 && <p>No Available Users to follow</p>}
                {alluser?.data?.filter((item: any) => !userFollowing.includes(item._id) && (user?.data?._id !== item._id)).map((item: any) => (
                    <div className="user__single flex gap-2 justify-between items-center my-5">
                        <div className="user flex items-center gap-2">
                            <Image
                                className="rounded-full border-2 border-secondary"
                                src={item.profile_picture || avatar}
                                width={35}
                                height={35}
                                alt="profile picture"
                            />
                            <div className="user_details">
                                <VisitUserProfile userName={item.name} userId={item._id} />
                                <p className="text-xs text-gray-600">
                                    joined on {moment(item.createdAt).format("Do MMM, YYYY")}
                                </p>
                            </div>
                        </div>
                        <FollowUser userId={item._id} />
                    </div>
                ))}

            </div>
        </div>
    )
}
