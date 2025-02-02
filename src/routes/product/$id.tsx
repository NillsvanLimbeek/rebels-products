import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { useWishlists } from "@/lib/hooks/useWishlists";
import { api } from "@/lib/services/api";
import { formatCamelCase } from "@/lib/utils/format-camel-case";
import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
  loader: (e) => api.get("/products/{id}", { params: { id: e.params.id } }),
});

function RouteComponent() {
  const product = Route.useLoaderData();
  const { id } = Route.useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string>("");
  const { wishlists, fetchWishlists } = useWishlists();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const list = wishlists.find((list) => list.id === selectedList);

    if (!list) throw new Error(`no list found with id: ${selectedList}`);

    api.put(
      "/wishlists/{id}",
      { ...list, products: [...list.products, Number(id)] },
      { params: { id: selectedList } },
    );

    setShowModal(false);
    fetchWishlists();
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 p-10 md:grid-cols-2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full rounded-xl object-cover"
        />

        <div className="mt-auto flex h-[15rem] flex-col justify-between md:h-[75%]">
          <div>
            <h1 className="text-2xl underline">{product.name}</h1>
            <h3 className="text-lg text-gray-600">{product.brand}</h3>
          </div>

          <div>
            {Object.entries(product.specifications).map(([key, value]) => (
              <dl className="flex gap-2" key={key}>
                <dt>{formatCamelCase(key)}:</dt>
                <dd>{value}</dd>
              </dl>
            ))}
          </div>

          <Button
            testid="add-to-wishlist"
            label="Add to wishlist"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>

      <Modal
        title="Add to wishlist"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <select
            id="wishlists"
            onChange={(e) => setSelectedList(e.target.value)}
          >
            <option value="">Select a wishlist</option>

            {wishlists.map((wishlist) => (
              <option key={wishlist.name} value={wishlist.id}>
                {wishlist.name}
              </option>
            ))}
          </select>

          <Button testid="add-product" type="submit" label="Add" />
        </form>
      </Modal>
    </>
  );
}
