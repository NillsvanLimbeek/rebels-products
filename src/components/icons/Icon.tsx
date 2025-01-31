import { Shop } from "./Shop";
import { Heart } from "./Heart";
import { Close } from "./Close";

const ICONS = {
  shop: Shop,
  heart: Heart,
  close: Close,
} as const;

export type IconName = keyof typeof ICONS;

interface Props {
  name: IconName;
  size?: string;
}

export function Icon({ name, size }: Props) {
  const IconComponent = ICONS[name];

  if (!IconComponent) {
    throw new Error(`no ${name} icon found`);
  }

  return <IconComponent size={size} />;
}
