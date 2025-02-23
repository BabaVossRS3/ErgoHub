import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import  Search  from "./_components/Search";
import PopularCategories from "./_components/PopularCategories";
import ProfessionalsGrid from "./_components/ProfessionalsGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="flex justify-center -mt-40 pt-10">
        <div className="w-[90%] md:w-[50%]">
          <Search />
        </div>
      </div>
      <PopularCategories/>
      <ProfessionalsGrid/>
    </div>
  );
}