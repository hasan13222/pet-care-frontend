"use client"
import { toast } from "@/hooks/use-toast";
import { useGetMyProfile } from "@/hooks/user.hooks";
import { useRouter } from "next/navigation";

export default function VisitUserProfile({ userId, userName }: { userId: string, userName: string }) {

    const router = useRouter();

    const { data: userData } = useGetMyProfile();
    const isUserFollowing = userData?.data.following.some(
        (item: any) => item._id === userId
    );
    const handleUserContent = () => {
        if (!isUserFollowing) {
            toast({ title: "please follow to see the user content" });
            return;
        }
        router.push(`/profile/${userId}`);
    };
    return (
        <h3 onClick={handleUserContent} className="text-sm font-medium cursor-pointer">{userName}</h3>
    )
}
