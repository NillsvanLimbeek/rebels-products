import { Header } from "@/components/Header";
import { ProductsProvider } from "@/lib/hooks/useProducts";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />

      <ProductsProvider>
        <Outlet />
      </ProductsProvider>

      <TanStackRouterDevtools />
    </>
  ),
});
