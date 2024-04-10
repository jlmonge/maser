"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  // when pathname changes (aka we clicked a new page), close nav
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return <div></div>;
};

export default MobileNav;
