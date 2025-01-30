import { PixabayResponse } from "@/lib/types/Pixabay";
import { useEffect, useState } from "react";

const PIXABAY_URL = `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_TOKEN}`;
const PLACEHOLDER_URL = "https://placehold.co/600";

const usePixabay = (search: string) => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        const url = `${PIXABAY_URL}&q=${search}&min_width=600&min_height=600&image_type=photo`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = (await response.json()) as PixabayResponse;

        if (result.total === 0) {
          setImage(PLACEHOLDER_URL);
        }

        setImage(result.hits[0].webformatURL);
      } catch (err) {
        console.error(
          err instanceof Error ? err : new Error("An error occurred"),
        );
        setImage(PLACEHOLDER_URL);
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchImages();
    }
  }, [search]);

  return { image, loading };
};

export default usePixabay;
