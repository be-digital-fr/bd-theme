import { PropsWithChildren } from "react";

export default function ModalLayout({ children }: PropsWithChildren) {
  return <div className="relative z-50">{children}
  </div>;
}
