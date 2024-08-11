'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
  return (
    <div className="border border-primary-800 flex">
      <FilterButton filter="all">All Cabins</FilterButton>
      <FilterButton filter="small">1&mdash;3 guests</FilterButton>
      <FilterButton filter="medium">4&mdash;7 guests</FilterButton>
      <FilterButton filter="large">8&mdash;12 guests</FilterButton>
    </div>
  );
}

function FilterButton({ filter, children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);

    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
