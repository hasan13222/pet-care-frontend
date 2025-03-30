import { axiosSecure } from "@/lib/axiosInstance";
import Image from "next/image";
import avatar from "@/assets/images/man.png";
import Link from "next/link";
import FollowUser from "@/components/page/explore/FollowUser";
export default async function page() {

    const { data: user } = await axiosSecure.get("/api/users/me");

    return (
        <div className="flex flex-col gap-8 items-center my-3 px-1">
            <div className="max-w-[600px] w-[300px] lg:w-[400px] border py-5 px-5 sm:px-10 rounded-md">
                <h2 className="text-xl font-semibold mb-3  border-b pb-1">You are following</h2>
                {user?.data?.following.length === 0 && <p>You are not following anyone</p>}
                <ul className="flex flex-col gap-2 min-w-[310px]">
                    {user?.data?.following?.map((item: { name: string, profile_picture: string, _id: string }) => (
                        <li className="p-2 rounded-md hover:bg-gray-300/20 flex gap-2 items-center justify-between"> <Link className="flex gap-2 items-center " href={`/profile/${item._id}`}><Image className="rounded-full" alt="profile" width={40} height={40} src={item?.profile_picture || avatar} /> <span>{item?.name}</span></Link> <FollowUser userId={item._id}/> </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
