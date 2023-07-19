import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div
        className="w-full relative"
        style={{
          height: "calc(100vh - 57px)",
        }}
      >
        <Image src={"/home.jpg"} alt="home page" fill className="object-cover"/>
      </div>
    </main>
  );
}
