import { Header } from "@/components/Header";
import { ProductsProvider } from "@/lib/hooks/useProducts";
import { WishlistsProvider } from "@/lib/hooks/useWishlists";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />

      <main className="p4 container mx-auto">
        <ProductsProvider>
          <WishlistsProvider>
            <Outlet />
          </WishlistsProvider>
        </ProductsProvider>
      </main>
    </>
  ),
});
