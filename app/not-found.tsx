import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 rounded-md bg-white shadow-[0_0_10px_rgba(0,0,0,10%)] text-center">
        <h2 className="text-2xl leading-[143%] text-black font-semibold">
          Page Was Not Found
        </h2>
        <p className="text-lg leading-[143%] text-gray-500 font-medium mt-2">
          Could not find requested resource
        </p>
        <Link
          className="inline-block px-4 py-3 rounded-sm bg-black text-lg leading-[143%] text-white font-medium mt-6"
          href="/boards"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
