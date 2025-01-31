import { Link } from "@tanstack/react-router";
import { RebelsLogo } from "./RebelsLogo";
import { Icon } from "./icons/Icon";
import { LINKS } from "@/lib/constants/links";

export function Header() {
  return (
    <nav className="mb-5 flex items-center gap-5 border-b border-gray-700 px-5 py-2">
      <Link
        to="/"
        className="hover:text-rebels mr-5 transition-colors duration-200 ease-in"
      >
        <RebelsLogo />
      </Link>

      {LINKS.map(({ link, to, icon }) => (
        <Link
          key={link}
          to={to}
          className="hover:text-rebels flex items-center gap-2 capitalize transition-colors duration-200 ease-in-out [&.active]:font-bold"
        >
          <Icon name={icon} size="20" /> {link}
        </Link>
      ))}
    </nav>
  );
}
