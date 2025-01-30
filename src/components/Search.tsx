import { FormEvent, useState } from "react";
import { Close } from "./icons/Close";

interface Props {
  handleSearch: (search: string) => void;
  handleClearSearch: () => void;
}

export function Search({ handleSearch, handleClearSearch }: Props) {
  const [search, setSearch] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    handleSearch(search);
  }

  function onClearSearch() {
    setSearch("");
    handleClearSearch();
  }

  return (
    <form onSubmit={onSubmit} className="mb-5 flex w-full items-center">
      <label htmlFor="search" className="mr-3 text-xl">
        Search
      </label>

      <div className="relative mr-3 w-full">
        <input
          className="hover:border-rebels focus:border-rebels outline-rebels w-full flex-auto rounded-4xl border-2 border-black px-5 py-2 placeholder:text-gray-500 focus:outline-2 focus:outline-none"
          type="text"
          id="search"
          name="search"
          placeholder="Search for products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length > 0 && (
          <button
            type="button"
            className="hover:text-rebels absolute top-[50%] right-5 z-10 translate-y-[-50%] cursor-pointer rounded-full"
            onClick={onClearSearch}
          >
            <Close size="20" />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="bg-rebels cursor-pointer rounded-4xl px-8 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-black"
      >
        Search
      </button>
    </form>
  );
}
