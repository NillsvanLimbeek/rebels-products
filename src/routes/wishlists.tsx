import { Button } from "@/components/Button";
import { GenericList } from "@/components/GenericList";
import { Modal } from "@/components/Modal";
import { Search } from "@/components/Search";
import { WishlistCard } from "@/components/WishlistCard";
import { useWishlists } from "@/lib/hooks/useWishlists";
import { api } from "@/lib/services/api";
import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/wishlists")({
  component: Wishlists,
});

function Wishlists() {
  const {
    wishlists,
    searchWishlists,
    filteredWishlists,
    clearSearch,
    fetchWishlists,
  } = useWishlists();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await api.post("/wishlists", {
      name,
      products: [],
    });

    fetchWishlists();

    setName("");
    setIsModalOpen(false);
  }

  return (
    <>
      <Search
        placeholder="Search wishlists"
        handleSearch={(e) => searchWishlists(e)}
        handleClearSearch={clearSearch}
      />

      <div className="mb-5">
        <Button label="Add new wishlist" onClick={() => setIsModalOpen(true)} />
      </div>

      <GenericList
        items={filteredWishlists || wishlists}
        renderItem={(wishlist) => <WishlistCard wishlist={wishlist} />}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add wishlist"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="title" className="text-xl">
            Name
          </label>
          <input
            className="hover:border-rebels focus:border-rebels outline-rebels mb-4 w-full flex-auto rounded-4xl border-2 border-black px-5 py-2 placeholder:text-gray-500 focus:outline-2 focus:outline-none"
            type="text"
            id="title"
            name="title"
            placeholder="Wishlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button type="submit" label="Create" />
        </form>
      </Modal>
    </>
  );
}
