import { FormEvent, useState } from "react";
import { Close } from "./icons/Close";
import { Button } from "./Button";

interface Props {
  placeholder: string;
  handleSearch: (search: string) => void;
  handleClearSearch: () => void;
}

export function Search({
  handleSearch,
  handleClearSearch,
  placeholder,
}: Props) {
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
    <form
      onSubmit={onSubmit}
      data-testid="form"
      className="mb-5 flex w-full items-center"
    >
      <label htmlFor="search" className="mr-3 text-xl">
        Search
      </label>

      <div className="relative mr-3 w-full">
        <input
          className="hover:border-rebels focus:border-rebels outline-rebels w-full flex-auto rounded-4xl border-2 border-black px-5 py-2 placeholder:text-gray-500 focus:outline-2 focus:outline-none"
          type="text"
          id="search"
          name="search"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length > 0 && (
          <button
            type="button"
            data-testid="clear"
            className="hover:text-rebels absolute top-[50%] right-5 z-10 translate-y-[-50%] cursor-pointer rounded-full"
            onClick={onClearSearch}
          >
            <Close size="20" />
          </button>
        )}
      </div>

      <Button type="submit" label="Search" />
    </form>
  );
}
