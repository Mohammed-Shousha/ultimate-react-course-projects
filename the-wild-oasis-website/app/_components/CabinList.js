// import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList({ filter }) {
  // noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  const displayedCabins = cabins.filter((cabin) => {
    if (filter === "all") return true;

    if (filter === "small") return cabin.maxCapacity <= 3;

    if (filter === "medium")
      return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;

    if (filter === "large") return cabin.maxCapacity >= 8;
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
