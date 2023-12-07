import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="bg-gray-300 text-black text-xl w-4/12 h-1/3 rounded-xl  flex flex-col items-center justify-center gap-5">
        <h2  className="text-2xl font-bold">Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className="bg-blue-600 text-white p-2 rounded-xl">
          Plase return to Home
        </Link>
      </div>
    </div>
  );
}
