import usePixabay from "@/lib/hooks/usePixabay";
import { Product } from "@/lib/types/Product";
import { Spinner } from "./Spinner";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { image, loading } = usePixabay(product.image);

  return (
    <article className="hover:text-rebels relative aspect-square cursor-pointer overflow-hidden rounded-xl text-white transition-transform duration-200 ease-in-out hover:-translate-y-1">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="absolute z-10 h-full w-full bg-linear-to-b from-transparent to-black/50" />
          <img
            className="h-full w-full object-cover"
            src={image}
            alt={product.name}
          />
        </>
      )}

      <h3 className="bg-opacity-50 absolute bottom-2 left-0 z-20 w-full p-2 text-center text-current">
        {product.name}
      </h3>
    </article>
  );
}
