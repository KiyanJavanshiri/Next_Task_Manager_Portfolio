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
    } else {
      setQuery("");
    }
  }, [searchParams]);

  return (
    <form
      onSubmit={handleSearch}
      className="justify-start items-stretch min-w-100 hidden lg:flex"
    >
      <input
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-l-sm outline-none text-sm text-black leading-[143%] font-normal placeholder:text-gray-400 focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-gray-300"
        placeholder="Search..."
        id="search"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        className="block px-4 bg-black border-y border-r border-y-gray-300 border-r-gray-300 rounded-r-sm dark:bg-gray-100 dark:text-gray-900 dark:border-y-gray-600 dark:border-r-gray-600"
      >
        <FiSearch className="text-white dark:text-black" />
      </Button>
    </form>
  );
};

export default SearchBar;
