import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import NavbarAuth from "./navbar-auth";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav
      id="Navbar"
      className="container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px]"
    >
      <Link href="index.html" className="flex items-center shrink-0">
        <Image
          width={120}
          height={60}
          src="/assets/images/logos/logo.svg"
          alt="logo"
        />
      </Link>
      <ul className="nav-menus flex gap-[30px] items-center w-fit">
        <li>
          <Link href="" className="font-medium">
            Flash Sale
          </Link>
        </li>
        <li>
          <Link href="" className="font-medium">
            Discover
          </Link>
        </li>
        <li>
          <Link href="" className="font-medium">
            Packages
          </Link>
        </li>
        <li>
          <Link href="" className="font-medium">
            Stories
          </Link>
        </li>
        <li>
          <Link href="" className="font-medium">
            About
          </Link>
        </li>
        <NavbarAuth />
      </ul>
    </nav>
  );
};

export default Navbar;
