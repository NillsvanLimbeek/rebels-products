import { MouseEvent } from "react";

interface Props {
  label: string;
  type?: HTMLButtonElement["type"];
  testid?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ label, type = "button", onClick, testid }: Props) {
  return (
    <button
      data-testid={testid}
      type={type}
      className="bg-rebels cursor-pointer rounded-4xl px-8 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-black"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
