import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import { useToast } from "../../../lib/providers/toast-provider";

export interface HeaderPropsType extends ReactProps {}
export function Header({ ...props }: HeaderPropsType) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();
  const accountRef = useRef();
  const toast = useToast();
  const clipboard = useClipboard({
    onSuccess() {
      toast.dark("Address has been saved to clipboard.");
    },
  });

  const menus = [
    { path: "/", label: "Home" },
    { path: "/exchange", label: "Exchange" },
    { path: "/about", label: "About Us" },
    // { path: "/minifarms", label: "Mini Farms" },
    // { path: "/dragons", label: "Dragons" },
    // { path: "/battles", label: "Battles" },
    // { path: "/castles", label: "Castles" },
  ];

  return <></>;
}
