import Image from "next/image";
import Hero from "./components/hero";
import NavBar from "./components/navbar";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Image
        src="/logo.png"
        height={300}
        width={300}
        className="opacity-10 -z-50 h-full w-full absolute object-contain top-0 left-0"
      />
      <div className="h-[100vh] w-full flex flex-col items-center justify-start md:gap-5 backdrop-blur-sm">
        <NavBar />
        <p>Created by <Link target="_blank" className="underline" href='https://www.ankitkhanal.me'>Ankit Khanal</Link></p>

        <Hero />
      </div>
    </>
  );
}
