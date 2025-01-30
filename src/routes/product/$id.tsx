import { api } from "@/lib/services/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
  loader: (e) => api.get("/products/{id}", { params: { id: e.params.id } }),
});

function RouteComponent() {
  const product = Route.useLoaderData();

  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
}
