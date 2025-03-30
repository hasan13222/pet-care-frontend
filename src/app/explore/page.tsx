import ExploreUsers from "@/components/page/explore/ExploreUsers";

const page = () => {
  return (
    <div className="container mx-auto">
      <main className="flex flex-col gap-5 items-center my-7">
        <div className="max-w-[600px] w-[300px] lg:w-[400px] border py-5 px-5 sm:px-10 rounded-md">          
          <ExploreUsers/>
        </div>
      </main>
    </div>
  );
};

export default page;
