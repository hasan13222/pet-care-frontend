import Myposts from "@/components/page/profile/Myposts";
import UserInfo from "@/components/page/profile/UserInfo";

export default async function page() {
  // const user = await getCurrentUser();
  // const posts = await getMyPost();
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center my-3">
        <div className="post__items max-w-[600px] min-w-auto sm:min-w-[400px] md:min-w-[600px]">
          <UserInfo/>

          <Myposts/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
