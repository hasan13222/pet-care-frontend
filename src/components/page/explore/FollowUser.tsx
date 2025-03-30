"use client"
import { Button } from "@/components/ui/button"
import { useFollowUser, useGetMyProfile, useUnFollowUser } from "@/hooks/user.hooks";

export default function FollowUser({ userId }: { userId: string }) {

    const { data: userData } = useGetMyProfile();
    const { mutate: follow } = useFollowUser(userData?.data._id);
    const { mutate: unfollow } = useUnFollowUser(userData?.data._id);

    const isUserFollowing = userData?.data.following.some(
        (item: any) => item._id === userId
    );

    // follow unfollow
    function handleFollow() {
        follow({ following: userId });
    }
    function handleUnFollow() {
        unfollow({ following: userId });
    }
    return (
        <div className="follow">
            {
                !isUserFollowing && (
                    <Button onClick={handleFollow} size="sm" className="bg-primary h-7">
                        Follow
                    </Button>
                )}

            {
                isUserFollowing && (
                    <Button onClick={handleUnFollow} size="sm" className="bg-primary h-7">
                        Unfollow
                    </Button>
                )}
        </div>
    )
}
