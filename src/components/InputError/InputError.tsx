import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function InputError({ children }: Props) {
  return <p className="text-sm text-red-600 dark:text-red-400">{children}</p>;
}
