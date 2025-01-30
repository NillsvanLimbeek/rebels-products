import { ProductsProvider } from "@/lib/hooks/useProducts";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Products
        </Link>
        <Link to="/wishlists" className="[&.active]:font-bold">
          Wishlists
        </Link>
      </div>
      <hr />

      <ProductsProvider>
        <Outlet />
      </ProductsProvider>

      <TanStackRouterDevtools />
    </>
  ),
});
