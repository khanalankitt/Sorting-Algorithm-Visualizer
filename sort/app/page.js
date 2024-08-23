import Hero from "./components/hero";
import NavBar from "./components/navbar";
export default function Home() {
  return (
    <>
      <div className="h-[100vh] w-full flex flex-col items-center justify-start gap-2 md:gap-5">
        <NavBar/>
        <Hero/>
      </div>
    </>
  );
}
