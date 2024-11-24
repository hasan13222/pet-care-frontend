import Link from "next/link";

const page = () => {
  return (
    <div className="w-svw h-svh flex justify-center items-center">
      <h1>Page is Under Developemnt.</h1>
      <p>
        Go to <Link className="text-primary" href="/">Home</Link>
      </p>
    </div>
  );
};

export default page;
