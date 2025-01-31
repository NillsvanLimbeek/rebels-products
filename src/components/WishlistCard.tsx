import { Wishlist } from "@/lib/types/Wishlist";
import { Link } from "@tanstack/react-router";
import { RebelsLogo } from "./RebelsLogo";

interface Props {
  wishlist: Wishlist;
}
export function WishlistCard({ wishlist }: Props) {
  return (
    <Link to="/wishlist/$id" params={{ id: wishlist.id }}>
      <article className="hover:text-rebels relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-black text-gray-600 transition-transform duration-200 ease-in-out hover:-translate-y-1">
        <h2 className="mb-3 text-4xl text-black">
          {wishlist.products.length} Items
        </h2>
        <h3 className="text-gray-600">{wishlist.name}</h3>

        <div className="absolute scale-[5] opacity-15">
          <RebelsLogo />
        </div>
      </article>
    </Link>
  );
}
