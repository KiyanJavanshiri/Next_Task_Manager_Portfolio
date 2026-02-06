"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import Button from "./Button/Button";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(() => searchParams.get("board") || "");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("board", query);
    router.push(`/boards?${params.toString()}`)
  };

  useEffect(() => {
    const searchQuery = searchParams.get("board");
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(searchQuery);
    }
  }, [searchParams.get("board")]);

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-start items-stretch min-w-100"
    >
      <input
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-l-sm outline-none text-sm text-black leading-[143%] font-normal placeholder:text-gray-400 focus:border-black"
        placeholder="Search..."
        id="search"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        className="block px-4 bg-black border-y border-r border-y-gray-300 border-r-gray-300 rounded-r-sm"
      >
        <FiSearch className="text-white" />
      </Button>
    </form>
  );
};

export default SearchBar;
