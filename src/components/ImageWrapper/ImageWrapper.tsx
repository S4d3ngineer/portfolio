import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ImageWrapper({ children }: Props) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md shadow-lg">
      {children}
    </div>
  );
}
