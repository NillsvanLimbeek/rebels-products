import { IconName } from "@/components/icons/Icon";

interface Link {
  to: string;
  link: string;
  icon: IconName;
}
export const LINKS: Link[] = [
  { to: "/", link: "products", icon: "shop" },
  { to: "/wishlists", link: "wishlists", icon: "heart" },
];
