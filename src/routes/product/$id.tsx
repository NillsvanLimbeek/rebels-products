import { api } from "@/lib/services/api";
import { formatCamelCase } from "@/lib/utils/format-camel-case";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
  loader: (e) => api.get("/products/{id}", { params: { id: e.params.id } }),
});

function RouteComponent() {
  const product = Route.useLoaderData();

  return (
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
            <dl className="flex gap-2">
              <dt>{formatCamelCase(key)}:</dt>
              <dd>{value}</dd>
            </dl>
          ))}
        </div>

        <button className="bg-rebels cursor-pointer rounded-4xl px-8 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-black">
          Add to wishlist
        </button>
      </div>
    </div>
  );
}
