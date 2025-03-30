import { axiosSecure } from "@/lib/axiosInstance";
import Image from "next/image";
import avatar from "@/assets/images/man.png";
import Link from "next/link";
import { getUserFollowers } from "@/services/userService";
export default async function page() {

    const { data: user } = await axiosSecure.get("/api/users/me");
    const followers = await getUserFollowers(user?.data?._id)
    return (
        <div className="flex flex-col gap-8 items-center my-3 px-2">
            <div className="max-w-[600px] w-[300px] lg:w-[400px] border py-5 px-5 sm:px-10 rounded-md">
                <h2 className="text-xl font-semibold mb-3  border-b pb-1">Your Followers</h2>
                {followers?.data?.length === 0 && <p>You have no followers</p>}
                <ul className="flex flex-col gap-2 min-w-[310px]">
                    {followers?.data?.map((item: { name: string, profile_picture: string, _id: string }) => (
                        <li className="p-2 rounded-md hover:bg-gray-300/20"> <Link className="flex gap-2 items-center" href={`/profile/${item._id}`}><Image className="rounded-full" alt="profile" width={40} height={40} src={item?.profile_picture || avatar} /> <span>{item?.name}</span></Link> </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
