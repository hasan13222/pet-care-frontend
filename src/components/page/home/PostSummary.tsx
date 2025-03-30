import { Button } from "@/components/ui/button";
import { getPostsSummary } from "@/services/postService";

export default async function PostSummary() {
    const summary = await getPostsSummary();
    return (
        <>
            <h3 className="mb-2 flex shadow-sm rounded-md px-1 py-1 border-b gap-7 text-sm items-center">
                <span>Total Posts{" "}</span>
                <Button
                    size="sm"
                    className="h-[22px] bg-secondary px-[6px] cursor-text hover:bg-secondary"
                    variant="secondary"
                >
                    {summary?.data?.posts}
                </Button>
            </h3>
            <h3 className="mb-2 flex shadow-sm rounded-md px-1 py-1 border-b gap-7 text-sm items-center">
                <span>Premium {" "}</span>
                <Button
                    size="sm"
                    className="h-[22px] bg-secondary px-[6px] cursor-text hover:bg-secondary"
                    variant="secondary"
                >
                    {summary?.data?.premiumPosts}
                </Button>
            </h3>
            <h3 className="mb-2 flex shadow-sm rounded-md px-1 py-1 border-b gap-7 text-sm items-center">
                <span>Regular {" "}</span>
                <Button
                    size="sm"
                    className="h-[22px] bg-secondary px-[6px] cursor-text hover:bg-secondary"
                    variant="secondary"
                >
                    {summary?.data?.posts - summary?.data?.premiumPosts}
                </Button>
            </h3>
            <h3 className="mb-2 flex shadow-sm rounded-md px-1 py-1 border-b gap-7 text-sm items-center">
                <span>Tips{" "}</span>
                <Button
                    size="sm"
                    className="h-[22px] bg-secondary px-[6px] cursor-text hover:bg-secondary"
                    variant="secondary"
                >
                    {summary?.data?.tips}
                </Button>
            </h3>
            <h3 className="mb-2 flex shadow-sm rounded-md px-1 py-1 border-b gap-7 text-sm items-center">
                <span>Stories{" "}</span>
                <Button
                    size="sm"
                    className="h-[22px] bg-secondary px-[6px] cursor-text hover:bg-secondary"
                    variant="secondary"
                >
                    {summary?.data?.posts - summary?.data?.tips}
                </Button>
            </h3>
        </>
    )
}
